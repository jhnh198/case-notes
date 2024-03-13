export const StandardTemplates = [
  {
    id: "display-disconnect-template",
    templateText: 
      `Issue: Display Disconnect \n
      \n
      Troubleshooting / Solution: \n
      \t • Truck is on and running \n
      \t • Sent power cycle to OBC and display rebooted \n
      \t • Driver is able to log in and display functions as normal
      `,
  },
  {
    id: "no-cell-template",
    templateText: 
      `Issue: No cell or communication from unit \n
      \n
      Troubleshooting / Solution: \n
      \t • Truck is on and running \n
      \t • OBC Refresh from the display \n
      \t • OBC reconnected and the OBC is communicating
      `,
  },
  {
    id: "otap-template",
    templateText: 
      `Issue: Send OTAP to unit \n
      \n
      Troubleshooting / Solution: \n
      \t • Sent OTAP to unit \n
      \n
      Recommended Next Steps: \n
      \t • Allow up to one hour for OTAP to complete
      `,
  },
  {
    id: "log-edit-template",
    templateText: 
      `Issue: Log Edit \n
      \n
      Troubleshooting / Solution: \n
      \t • Showed driver where logs can be edited on the display. \n
      \t • Driver is able to make the necessary changes. Issue resolved \n
      \n
      Recommended Next Steps: \n
      \t • Contact safety at company or DOT if unsure about log entries.
      `,
  },
]