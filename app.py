from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class RequestLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    endpoint = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    response_time = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "API Observability Dashboard backend is running"

@app.route("/log", methods=["POST"])
def log_request():
    data = request.get_json()

    log = RequestLog(
        endpoint=data["endpoint"],
        status=data["status"],
        response_time=data["response_time"]
    )

    db.session.add(log)
    db.session.commit()

    return jsonify({"message": "Log saved"}), 201

@app.route("/logs", methods=["GET"])
def get_logs():
    logs = RequestLog.query.order_by(RequestLog.timestamp.desc()).all()

    return jsonify([
        {
            "id": log.id,
            "endpoint": log.endpoint,
            "status": log.status,
            "response_time": log.response_time,
            "timestamp": log.timestamp.isoformat()
        }
        for log in logs
    ])

@app.route("/metrics", methods=["GET"])
def get_metrics():
    logs = RequestLog.query.all()

    total_requests = len(logs)
    error_count = len([log for log in logs if log.status >= 400])
    avg_response_time = (
        sum(log.response_time for log in logs) / total_requests
        if total_requests > 0 else 0
    )

    return jsonify({
        "total_requests": total_requests,
        "error_count": error_count,
        "avg_response_time": round(avg_response_time, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)