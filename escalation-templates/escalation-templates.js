export const escalationTemplates = [
{
  id: "case-notes-email-template",
  templateText: 
    `Hello {{{Recipient.FirstName}}}, 

Thank you for contacting Trimble Transportation Support.  Please see below for notes on case {{{Case.CaseNumber}}}:  
         
Please reply to this email with any problem you may have. If you would like to speak with a representative you may contact 888-346-3486, select option 1, and reference case number {{{Case.CaseNumber}}}. To search for answers to your Trimble Transportation questions, please visit MyTransportation at https://crmtransportation.force.com/service.
    `,
},
{
  id: "blank-email-template",
  templateText: 
    `Hello {{{Recipient.FirstName}}},

Thank you for contacting Trimble Transportation Support. I have received your email and I would be happy to help you.
    
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
{
  id: "e2-template",
  templateText: 
    `E2 Escalation Template

    CID: 
    Company Name: 
    Case Number: 
    Issue Description: 
     
    Truck number(s):
    TabA Serial Number:
    Reason for Escalation:
    Date/Time of issue: 
    Troubleshooting Steps Taken:
     
    Contact Name: 
    Contact Phone and EMail:
    Customer Shipping Address:
    Shipping speed requested :
    `,
},
];