import { Badge } from "react-bootstrap";

export default function Bug({ indbug }) {
  const { image, assignee, bug_id, id, description, scenario, status, priority } = indbug;

  const unq = indbug.bug_code;

  const getInitials = (assineeName) => {
    if (!assineeName) return "";
    const parts = assineeName.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const last = parts[parts.length - 1]?.charAt(0).toUpperCase() || "";
    return `${first}${last}`;
  };

  
  const dynamicBackgroundColors = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const r = (hash >> 16) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = hash & 0xff;

    const clamp = (value) => {
      const min = 70;
      const max = 200;
      return Math.min(max, Math.max(min, Math.abs(value)));
    };

    return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
  };

  // Function to handle the click event on <tr>
  const handleRowClick = (id) => {
    sessionStorage.setItem("bugId", id); // Store bugId in sessionStorage
    window.open(`/bug/${unq}`, "_blank"); // Open in a new tab
  };

  const bgColor = dynamicBackgroundColors(assignee || "");

  const initialsStyle = {
    backgroundColor: bgColor,
    color: "white",
    border: `1px solid ${bgColor}`,
    boxShadow: `0 0 3px ${bgColor}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1em",
    fontWeight: "bold",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      Feature: "#9370DB", // Lavender
      Low: "#28a745", // Green
      High: "#dc3545", // Red
      Critical: "#000000", // Black
    };
    return priorityColors[priority] || "#6c757d"; // Default gray
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Open: "danger", // Red
      WIP: "warning", // Orange
      Fixed: "success", // Green
      Closed: "success", // Dark Green
      Deferred: "info", // Yellow
      Rejected: "secondary", //Dark Gray
    };
    return (
      <Badge
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "9em",
          height: "2em",
          marginTop: "1em",
          borderRadius: "1em",
        }}
        bg={statusColors[status]}
      >
        {status}
      </Badge>
    );
  };

  return (
    <tr onClick={() => handleRowClick(bug_id)} key={indbug.bug_id}>
      {/* Bug description column */}
      <td style={{ display: "flex", alignItems: "center" }}>
        {/* Vertical section for priority */}
        <div
          style={{
            width: "4px",
            height: "50px",
            backgroundColor: getPriorityColor(priority), // Priority color
            marginRight: "10px",
          }}
        />
        {/* Bug details */}
        <div>
          <div>{id}</div>
          <div>{description}</div>
        </div>
      </td>

      {/* Scenario column */}
      <td style={{ paddingTop: "20px" }}>{scenario}</td>

      {/* Status column with colored badge */}

      <td>{getStatusBadge(status)}</td>

      {/* Assignee column */}
      <td>
        {image ? (
          <img src={image} alt="Profile" style={sharedStyle} />
        ) : (
          <div style={initialsStyle}>{getInitials(assignee)}</div>
        )}
      </td>

    </tr>
  );
}
