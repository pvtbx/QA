var gr = new GlideRecord('incident'); // Create reference to incident table

// Query parameter 
//gr.addEncodedQuery('sys_created_onBETWEENjavascript:gs.beginningOfLast7Days()@javascript:gs.endOfToday()');
gr.query();

var hasDup = false; // check if duplicate record exists

var calculatedPercentage = Math.floor(gr.getRowCount() / 2);

var incidentArray = []; // Create empty array

function fillIncidentArray() {
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

function checkForDuplicates() {
    var dupAggregate = new GlideAggregate('u_qa');
    dupAggregate.groupBy('number');
    dupAggregate.query();
    var dupRecord;
    while (dupAggregate.next()) {
        dupRecord = new GlideRecord('u_qa');
        dupRecord.addQuery('number', dupAggregate.number);
        dupRecord.query();
        dupRecord.next();
        while (dupRecord.next()) {
          hasDup = true;
            //dupRecord.deleteRecord();
        }
    }
}

function moveRecords() {

    fillIncidentArray();

    for (var i = 0; i < 4; i++) {

        var QATableRecord = new GlideRecord('u_qa');
        var randomRecord = incidentArray[Math.floor(Math.random() * incidentArray.length)];
        var randomRecordArray = [];
        var recordCounter = 0;

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

        randomRecordArray.push(QATableRecord);
    	  checkForDuplicates();

        for (var j = 0; j < randomRecordArray.length; j++) {

            if (randomRecordArray[j] == QATableRecord) {
                recordCounter++;
            }
        }

        if (recordCounter == 1 && !hasDup) {
            QATableRecord.insert();
        }
    }
}
    moveRecords();
