export const StandardTemplates = [
  {
    id: "display-disconnect-template",
    templateText: 
      `Issue: Display Disconnect 

Troubleshooting / Solution: 
    \t • Truck is on and running
    \t • Sent power cycle to OBC and display rebooted 
    \t • Driver is able to log in and display functions as normal
      `,
  },
  {
    id: "no-cell-template",
    templateText: 
      `Issue: No cell or communication from unit 
      
Troubleshooting / Solution: 
    \t • Truck is on and running 
    \t • OBC Refresh from the display 
    \t • OBC reconnected and the OBC is communicating
      `,
  },
  {
    id: "otap-template",
    templateText: 
      `Issue: Send OTAP to unit 
      
      Troubleshooting / Solution: 
      \t • Sent OTAP to unit 
      
      Recommended Next Steps: 
      \t • Allow up to one hour for OTAP to complete
      `,
  },
  {
    id: "log-edit-template",
    templateText: 
      `Issue: Log Edit 
      
      Troubleshooting / Solution: 
      \t • Showed driver where logs can be edited on the display. 
      \t • Driver is able to make the necessary changes. Issue resolved 
      
      Recommended Next Steps: 
      \t • Contact safety at company or DOT if unsure about log entries.
      `,
  },
]