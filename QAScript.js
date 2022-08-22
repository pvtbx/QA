// move last weeks records to QAMonthly
function moveLastWeeksQAWeeklies() {

    var qaWeeklyGr = new GlideRecord('u_qa_weekly');
    qaWeeklyGr.query();
    while (qaWeeklyGr.next()) {
     		var qaMonthlyGr = new GlideRecord('u_qa_monthly')
        qaMonthlyGr.number = qaWeeklyGr.number;
        qaMonthlyGr.caller_id = qaWeeklyGr.caller_id;
        qaMonthlyGr.category = qaWeeklyGr.category;
        qaMonthlyGr.subcategory = qaWeeklyGr.subcategory;
        qaMonthlyGr.business_service = qaWeeklyGr.business_service;
        qaMonthlyGr.service_offering = qaWeeklyGr.service_offering;
        qaMonthlyGr.cmdb_ci = qaWeeklyGr.cmdb_ci;
        qaMonthlyGr.universal_request = qaWeeklyGr.universal_request;
        qaMonthlyGr.route_reason = qaWeeklyGr.route_reason;
        qaMonthlyGr.contact_type = qaWeeklyGr.contact_type;
        qaMonthlyGr.state = qaWeeklyGr.state;
        qaMonthlyGr.hold_reason = qaWeeklyGr.hold_reason;
        qaMonthlyGr.impact = qaWeeklyGr.impact;
        qaMonthlyGr.urgency = qaWeeklyGr.urgency;
        qaMonthlyGr.priority = qaWeeklyGr.priority;
        qaMonthlyGr.assignment_group = qaWeeklyGr.assignment_group;
        qaMonthlyGr.assigned_to = qaWeeklyGr.assigned_to;
        qaMonthlyGr.description = qaWeeklyGr.description;
        qaMonthlyGr.short_description = qaWeeklyGr.short_description;
        qaMonthlyGr.comments = qaWeeklyGr.comments;
        qaMonthlyGr.work_notes = qaWeeklyGr.work_notes;
      	qaMonthlyGr.insert();
      	qaWeeklyGr.deleteRecord();
    } // end while
} // end moveLastWeeksQAWeeklies


var incidentArray = []; // Create empty array

// take 10% of incident records and put them into incidentArray
function fillIncidentArray() {
    var gr = new GlideRecord('incident'); // Create reference to incident table

    // Query parameter 
//gr.addEncodedQuery('sys_created_onBETWEENjavascript:gs.beginningOfLast7Days()@javascript:gs.endOfToday()');
    gr.query();
    //var calculatedPercentage = Math.floor(gr.getRowCount() / 2);

    while (gr.next() && gr.caller_id != "") {
      
        var obj = {};
        obj.number = gr.number.toString();
        obj.caller_id = gr.caller_id.toString();
        obj.category = gr.category.toString();
        obj.subcategory = gr.subcategory.toString();
        obj.business_service = gr.business_service.toString();
        obj.service_offering = gr.service_offering.toString();
        obj.cmdb_ci = gr.cmdb_ci.toString();
        obj.universal_request = gr.universal_request.toString();
        obj.route_reason = gr.route_reason.toString();
        obj.contact_type = gr.contact_type.toString();
        obj.state = gr.state.toString();
        obj.hold_reason = gr.hold_reason.toString();
        obj.impact = gr.impact.toString();
        obj.urgency = gr.urgency.toString();
        obj.priority = gr.priority.toString();
        obj.assignment_group = gr.assignment_group.toString();
        obj.assigned_to = gr.assigned_to.toString();
        obj.description = gr.description.toString();
        obj.short_description = gr.short_description.toString();
        obj.comments = gr.comments.toString();
        obj.work_notes = gr.work_notes.toString();

        incidentArray.push(obj);
    }
}

function insertRandomRecord() {

    var QATableRecord = new GlideRecord('u_qa_weekly');
    var randomIndex = Math.floor(Math.random() * incidentArray.length);
    var randomRecord = incidentArray[randomIndex];
  
    QATableRecord.number = randomRecord.number.toString();
    QATableRecord.caller_id = randomRecord.caller_id.toString();
    QATableRecord.number = randomRecord.number.toString();
    QATableRecord.caller_id = randomRecord.caller_id.toString();
    QATableRecord.category = randomRecord.category.toString();
    QATableRecord.subcategory = randomRecord.subcategory.toString();
    QATableRecord.business_service = randomRecord.business_service.toString();
    QATableRecord.service_offering = randomRecord.service_offering.toString();
    QATableRecord.cmdb_ci = randomRecord.cmdb_ci.toString();
    QATableRecord.universal_request = randomRecord.universal_request.toString();
    QATableRecord.route_reason = randomRecord.route_reason.toString();
    QATableRecord.contact_type = randomRecord.contact_type.toString();
    QATableRecord.state = randomRecord.state.toString();
    QATableRecord.hold_reason = randomRecord.hold_reason.toString();
    QATableRecord.impact = randomRecord.impact.toString();
    QATableRecord.urgency = randomRecord.urgency.toString();
    QATableRecord.priority = randomRecord.priority.toString();
    QATableRecord.assignment_group = randomRecord.assignment_group.toString();
    QATableRecord.assigned_to = randomRecord.assigned_to.toString();
    QATableRecord.description = randomRecord.description.toString();
    QATableRecord.short_description = randomRecord.short_description.toString();
    QATableRecord.comments = randomRecord.comments.toString();
    QATableRecord.work_notes = randomRecord.work_notes.toString();
    QATableRecord.insert();
}

function moveRecords() {

    fillIncidentArray();

    for(var j = 0; j < 4; j++){
     insertRandomRecord();
    }
}
moveLastWeeksQAWeeklies();
moveRecords();
