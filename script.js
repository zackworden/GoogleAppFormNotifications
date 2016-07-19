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
	var serviceType = {
		'slack' : 'SLACK',
		'trello' : 'TRELLO',
	}
	var serviceFunction = {
		'trello' : {
			'subjectLine' : function( formResponse )
				{
					return 'trello subject line incorporating ' +  formResponse.responses[0]  + ' !' 
				},
			'body' : function( formResponse )
				{
					return 'trello body incorporating ' +  formResponse.responses[0]  + ' !' 
				},
		},
		'slack' : {
			'subjectLine' : function( formResponse )
			{
				return 'slack subject line incorporating ' +  formResponse.responses[0]  + ' !' 
			},
			'body' : function( formResponse )
			{
				return 'slack body incorporating ' +  formResponse.responses[0]  + ' !' 
			},
		}
	}


	var serviceFactory = new NotifiedServiceFactory();
// classes
	// notified service
	function NotifiedServiceFactory()
	{
		this.GetSubjectLineFunction = function( serviceType )
		{
			switch ( serviceType )
			{
				case serviceType.slack:
					return function(){
						return 'IMPROVED Slack subject line: ' + formResponse.responses[0];
					};
				break;
				case serviceType.trello:
					return function(){
						return 'IMPROVED Trello subject line: ' + formResponse.responses[0];
					};
				break;
			}
		}
	}
	function NotifiedService( recipient, getSubjectLineFunction, getBodyFunction )
	{
		this.recipient = recipient;
		this.subjectLine = 'undefined subject line';
		this.body = 'undefined body';
		this.ParseSubjectLine = getSubjectLineFunction;
		this.ParseBody = getBodyFunction;

		this.GetRecipient = function()
		{
			return this.recipient;
		}
		this.GetSubjectLine = function( testFormResponse )
		{
			this.subjectLine = this.ParseSubjectLine( testFormResponse );
			return this.subjectLine;
		}
		this.GetBody = function( testFormResponse )
		{
			this.body = this.ParseBody( testFormResponse );
			return this.body;
		}
	}

	// test form response
	function TestFormResponse()
	{
		this.responses = ['yes', 'Alabama', 'False', '37'];
	}


	// email service

	// form service


// functions
	function Test()
	{
		var testFormResponse = new TestFormResponse();
		
		var sl = serviceFunction.trello.subjectLine;
		Logger.log( sl( testFormResponse ) );


		/*
		var testFormResponse = new TestFormResponse();
		//var Trello_Getter = new GetSubjectLine_Trello.bind( undefined, [testFormResponse] );
		//var Slack_Getter = new GetSubjectLine_Slack.bind( undefined, [testFormResponse] );
		var Trello = new NotifiedService( undefined, serviceFactory.GetSubjectLineFunction( serviceType.trello ), undefined );
		var Slack = new NotifiedService( undefined, serviceFactory.GetSubjectLineFunction( serviceType.slack ), undefined );
		//var Slack = new NotifiedService( undefined, GetSubjectLine_Slack, undefined );

		Logger.log( Trello.GetSubjectLine( testFormResponse ) );
		Logger.log( Slack.GetSubjectLine( testFormResponse ) );

		*/
	}
// run