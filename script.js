// notified services
	// email address to mail to

// form service
	// form name
	// responses to all questions

// email service
	// email address
	// subject line
	// body

/*
PROCESS:
get form answers
create an email and send to each notified service in a queue
allow form answers to flow into google sheet

*/
// const
// vars
// enums


// classes
	var notifiedServices = {
		'test' : {
			'emailAddress' : '',
			'formResponse' : '',
			'GetSubjectLine' : function()
			{
				return 'TEST subject line incorporating ' +  this.formResponse.responses[0]  + ' !' 
			},
			'GetBody' : function()
			{
				return 'TEST body incorporating ' +  this.formResponse.responses[0]  + ' !' 
			},
			'GetEmailAddress' : function()
			{
				return this.emailAddress;
			},
			'SendEmail' : function()
			{
				GmailApp.sendEmail( this.GetEmailAddress(), this.GetSubjectLine(), this.GetBody() );
				/*
				Logger.log("Email to: " + this.GetEmailAddress() );
				Logger.log("Subject Line: " + this.GetSubjectLine() );
				Logger.log("Body: " + this.GetBody() );
				*/
			},
		},
		'trello' : {
			'emailAddress' : '',
			'formResponse' : '',
			'GetSubjectLine' : function()
			{
				return 'trello subject line incorporating ' +  this.formResponse.responses[0]  + ' !' 
			},
			'GetBody' : function()
			{
				return 'trello body incorporating ' +  this.formResponse.responses[0]  + ' !' 
			},
			'GetEmailAddress' : function()
			{
				return this.emailAddress;
			},
			'SendEmail' : function()
			{
				GmailApp.sendEmail( this.GetEmailAddress(), this.GetSubjectLine(), this.GetBody() );
			},
		},
		'slack' : {
			'emailAddress' : '',
			'formResponse' : '',
			'GetSubjectLine' : function()
			{
				return 'slack subject line incorporating ' +  this.formResponse.responses[0]  + ' !' 
			},
			'GetBody' : function()
			{
				return 'slack body incorporating ' +  this.formResponse.responses[0]  + ' !' 
			},
			'GetEmailAddress' : function()
			{
				return this.emailAddress;
			},
			'SendEmail' : function()
			{
				GmailApp.sendEmail( this.GetEmailAddress(), this.GetSubjectLine(), this.GetBody() );
			},
		}
	};


	// test form response
	function TestFormResponse()
	{
		this.testLabel = 'Test Form Response';
		this.responses = ['yes', 'Alabama', 'False', '37'];
	}


	// form service


// functions
	function Test()
	{
		var testFormResponse = new TestFormResponse();


		// notifiedServices.test.formResponse = testFormResponse;
		//notifiedServices.test.SendEmail();
		
		var allServices = [ notifiedServices.test, notifiedServices.trello, notifiedServices.slack ];

		for ( counter = 0; counter < allServices.length; counter ++ )
		{
			allServices[counter].formResponse = testFormResponse;
			allServices[counter].SendEmail();
		}
		
	}
// run