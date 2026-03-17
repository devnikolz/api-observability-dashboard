import { useEffect, useState } from "react";

function App() {
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:5000/metrics").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/logs").then((res) => res.json()),
    ])
      .then(([metricsData, logsData]) => {
        setMetrics(metricsData);
        setLogs(logsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={styles.page}>Loading dashboard...</div>;
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>API Observability Dashboard</h1>

      {metrics && (
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h3>Total Requests</h3>
            <p style={styles.metric}>{metrics.total_requests}</p>
          </div>

          <div style={styles.card}>
            <h3>Error Count</h3>
            <p style={styles.metric}>{metrics.error_count}</p>
          </div>

          <div style={styles.card}>
            <h3>Avg Response Time</h3>
            <p style={styles.metric}>{metrics.avg_response_time} ms</p>
          </div>
        </div>
      )}

      <h2 style={styles.subtitle}>Request Logs</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cell}>ID</th>
              <th style={styles.cell}>Endpoint</th>
              <th style={styles.cell}>Status</th>
              <th style={styles.cell}>Response Time</th>
              <th style={styles.cell}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={styles.cell}>{log.id}</td>
                <td style={styles.cell}>{log.endpoint}</td>
                <td style={styles.cell}>{log.status}</td>
                <td style={styles.cell}>{log.response_time} ms</td>
                <td style={styles.cell}>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    marginBottom: "1.5rem",
  },
  subtitle: {
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  metric: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    margin: 0,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "0.75rem",
    textAlign: "left",
  },
};

export default App;