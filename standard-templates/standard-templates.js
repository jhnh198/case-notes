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
  {
    id: "case-notes-email-template",
    templateText: 
      `Hello {{{Recipient.FirstName}}}, 

      Thank you for contacting Trimble Transportation Support. I have received your email and I would be happy to help you. 
           
      Please reply to this email with any problem you may have. If you would like to speak with a representative you may contact 888-346-3486, select option 1, and reference case number {{{Case.CaseNumber}}}. To search for answers to your Trimble Transportation questions, please visit MyTransportation at https://crmtransportation.force.com/service.
      `,
  },
  {
    id: "blank-email-template",
    templateText: 
      `Hello {{{Recipient.FirstName}}},
 
      Thank you for contacting Trimble Transportation Support. Please see below for notes on case {{{Case.CaseNumber}}}: 
      
      Please reply to this email with any problem you may have. If you would like to speak with a representative you may contact 888-346-3486, select option 1, and reference case number {{{Case.CaseNumber}}}. To search for answers to your Trimble Transportation questions, please visit MyTransportation at https://crmtransportation.force.com/service.
      `,
  },
  {
    id: "csm-template",
    templateText: 
      `CSM ESCALATION INFORMATION

      CID: 
      Company Name: 
      Contact Name: 
      Contact phone and email: 
      What is the problem or the issue? 
      What would the customer like the CM to accomplish? 
      `,
  },
  {
    id: "drivewyze-template",
    templateText: 
      `DriveWyze Activation Escalation 

      Trimble CID 
      Company Name:
      Contact Name and Phone Number:
      Trimble Case Number: 
      
      Information of Unit needing bypass activated
      Truck number(s) : 
      DSN: 
      USDOT#: 
      License plate #: 
      License plate state: 
      VIN(complete): 
      `,
  },
  {
    id: "tsa-template",
    templateText: 
      `TSA Escalation

      CID: 
      Company Name: 
      Case Number: 
      Issue Description: 
      Lead TSR and/or TSA consulted: 
      
      VEHICLE INFORMATION
      Truck number(s): 
      Truck Make:
      Truck Model:
      Truck Year:
      
      DEVICE INFORMATION
      DSN(s): 
      DVR(s): 
      Vehicle Gateway Code/OBC Version: 
      ICAPID: 
      Application Code Version: 
      Driver Name(s): 
       
      WEB PORTAL INFORMATION
      Web Browser Type and Version: 
      Specific page or tab issue is occurring: 
      Number of Users Impacted: 
      Specific User(s) Impacted (for research): 
      Error Message(s): 
      
      ESCALATION DETAILS
      Date/Time/Time Zone of issue: 
      Troubleshooting steps taken: 
      Steps to replicate issue:
      Checked known issues?: 
      What is the goal of this escalation?:
      De-Escalate, or Escalate to (Specific Person):
      Additional Notes: 
      `,
  },
]