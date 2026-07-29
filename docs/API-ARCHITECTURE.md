{
  "transaction_id": "tx_99823_alpha",
  "risk_score": 0.88,
  "verdict": "Inject_Delay",
  "required_action": "prompt_secondary_biometric",
  "silent_alarm_triggered": true
}
{
  "transaction_id": "tx_99823_alpha",
  "timestamp": "2026-07-29T08:55:22Z",
  "bete_guard_data": {
    "covert_triggers": "none",
    "accelerometer_state": "moving_walking",
    "unknown_bluetooth_devices": 0
  },
  "test_results": {
    "blue_team": [{"test": "B_04", "status": "pass", "exec_ms": 12}],
    "red_team": [{"test": "R_11", "status": "fail", "exec_ms": 45}],
    "baseline": [{"test": "Base_01", "status": "pass", "exec_ms": 5}]
  }
}

