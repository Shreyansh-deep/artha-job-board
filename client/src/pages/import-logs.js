import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ImportLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLogId, setExpandedLogId] = useState(null);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/import-logs`
      );
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const toggleLog = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📄 Import History Logs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "20px",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th>Timestamp</th>
              <th>Source URL</th>
              <th>Total Fetched</th>
              <th>New</th>
              <th>Updated</th>
              <th>Failed</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <React.Fragment key={log._id}>
                <tr>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td style={{ maxWidth: 200, wordWrap: "break-word" }}>
                    {log.source}
                  </td>
                  <td>{log.totalFetched}</td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    {log.newJobs}
                  </td>
                  <td style={{ color: "orange", fontWeight: "bold" }}>
                    {log.updatedJobs}
                  </td>
                  <td>
                    {log.failedJobs?.length > 0 ? (
                      <button
                        onClick={() => toggleLog(log._id)}
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        {log.failedJobs.length} 🔽
                      </button>
                    ) : (
                      <span style={{ color: "gray" }}>0</span>
                    )}
                  </td>
                </tr>
                {expandedLogId === log._id && log.failedJobs.length > 0 && (
                  <tr>
                    <td colSpan="6">
                      <ul>
                        {log.failedJobs.map((f, index) => (
                          <li key={index} style={{ marginBottom: "8px" }}>
                            <strong>{f.jobId}</strong>
                            <br />
                            <em>{f.reason}</em>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
