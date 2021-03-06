﻿	  var CLIENT_ID = '287962904428-tehv0mvl6mvp1mia3vhesfiqpe2u1mrg.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
     function listUpcomingEvents() {
      var currentTime = new Date();
      var maxTime = new Date();
      maxTime.setMinutes(maxTime.getMinutes() + 3);
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin':currentTime.toISOString(),
          'timeMax':maxTime.toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              var whenEnd = event.end.dateTime;
              if (!whenEnd) {
                whenEnd = event.end.date;
              }
              alloname('Event ' + ++i);
              alloname('Title: ');
			  appendPre('   ' + event.summary);
              var offset= new Date(when.toString());
              var endDate = new Date(whenEnd.toString());
              alloname('Start Date - Time: ');
              appendPre( offset.toDateString() + ' - ' + offset.toLocaleTimeString());
              alloname('End Date - Time: ');
              appendPre(endDate.toDateString() + ' - ' + endDate.toLocaleTimeString());
              alloname('Description: \n  ');
              appendPre(event.description);
              alloname('Location: ');
              appendPre(event.location);
              alloname('Status: ');
              appendPre(event.status);
              
            }
          } else {
            appendPre('No upcoming events found. ' );
          }

        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre2 = document.createElement('h4');
        //var pre = document.getElementById('output');
        var fo = document.createAttribute('class');
		fo.value = "widget-titleInfo";
        var textContent = document.createTextNode(message);
        pre2.setAttributeNode(fo);
        pre2.appendChild(textContent);
        //pre2.appendChild(pre);
        document.body.appendChild(pre2);
      }
      
      function alloname(message2){
      var pre22 = document.createElement('h4');
        //var pre3 = document.getElementById('output');
        var fo3 = document.createAttribute('class');
		fo3.value = "widget-titleHeaddd";
        var textContent2 = document.createTextNode(message2);
        pre22.setAttributeNode(fo3);
        pre22.appendChild(textContent2);
        //pre22.appendChild(pre3);
        document.body.appendChild(pre22);
      }




