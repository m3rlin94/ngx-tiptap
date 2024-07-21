import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Content, Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { NgxTiptapModule } from 'ngx-tiptap';
import HighlightExtension from './highlight';

const concepts = [
  '2nd_segment_new_time',
  'AcneDuration',
  'AcneImages',
  'AcneMedicationDuration',
  'AcneMedicationName',
  'AcneMedications',
  'AcneMedicationsHelpedList',
  'AcneProtocol',
  'AcneSeverity',
  'action',
  'Age',
  'AirCanadaServices',
  'Airport',
  'AirportCode',
  'AlcoholUsage',
  'AllergiesList',
  'AltitudeStatus',
  'Arrival',
  'Bookig',
  'Booking',
  'BookingDate',
  'BookingReference',
  'BookingReferenceNumber',
  'bookingSource',
  'BooleanConcept',
  'CabinClass',
  'change_flight_time',
  'City',
  'Comment',
  'ContactName',
  'Country',
  'CurrentMedicationsWithDosagesList',
  'DateAndTime',
  'DateConcept',
  'DeliveryAddress',
  'Departure',
  'DepartureCity',
  'DepartureDate',
  'DestinationCity',
  'Drugs',
  'EstimatedTime',
  'ExperienceReview',
  'FamilyHistoryConditions',
  'Feedback',
  'FeverOrJointPain',
  'FieldConcept',
  'FirstName',
  'FlightNumber',
  'FlightStatus',
  'Gender',
  'HadAnySurgeries',
  'HasCholesterol',
  'HaveAnyAllergies',
  'image_display',
  'imageresprompt',
  'IND001',
  'ind002',
  'IND003',
  'ind004',
  'ind005',
  'ind006',
  'ind007',
  'ind008',
  'ind009',
  'InputText',
  'IntegerConcept',
  'IsAcneDiagnosed',
  'IsAcneScars',
  'IsCCOpen',
  'isCompanionTicket',
  'IsCompanyBooking',
  'IsFlightWithinDays',
  'IsPregnant',
  'IsTakingOtherMedications',
  'Itinerary',
  'IVRSendLinksAskConcepts',
  'LastName',
  'Lisinopril',
  'loopCount',
  'LowestFare',
  'MarketingMaterial',
  'MedicalExpense',
  'MedicalProblems',
  'MeetingDate',
  'MeetingTime',
  'MoreOptions',
  'NewConcept',
  'nextaction',
  'number1',
  'number2',
  'NumberOfFlights',
  'NumberOfTickets',
  'OneTimePassword',
  'operation',
  'OtherDrugs',
  'OtherMedicalProblems',
  'P2000_all_passengers_applicable',
  'p2001_retain_details',
  'p2002_ack_segment',
  'PassengerId',
  'PassengerProfile',
  'PatientProfile',
  'policy_number',
  'PolicyNumber',
  'PreExistingConditionExists',
  'PreExistingConditionList',
  'PreferredLanguage',
  'PrescriptionDosage',
  'PrescriptionList',
  'PreviousSurgeriesWithDates',
  'Product',
  'Rating',
  'RozieMember',
  'RozieMemberVerification',
  'RozieServices',
  'rwFillConcept1',
  'rwFillConcept2',
  'rwtstSubTopic',
  'rwtstTopic',
  'SalesTrack',
  'SeatUpgradeReminder',
  'SendInvite',
  'SideEffectList',
  'SideEffectListItem',
  'SignInToken',
  'SkinDescription',
  'SkinSensitivity',
  'SmartFormBoolean',
  'SmartFormTime',
  'SymptomList',
  'SymptomListItem',
  'temp_date',
  'TestBook',
  'TestBoolean',
  'TestConcept',
  'TestConcept2',
  'TestDoor',
  'TestInteger',
  'TestResponse',
  'TextConcept',
  'TimeZone',
  'total',
  'TotalWhiteBlackHeads',
  'travellingSoon',
  'UsedAcneMedications',
  'UsedAcneMedicationsWithDosagesList',
  'User',
  'WhatAreTheAvailableFlights',
];

@Component({
  selector: 'app-simple-editor-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxTiptapModule],
  templateUrl: './simple-editor-reactive.component.html',
  styleUrls: ['./simple-editor-reactive.component.css'],
})
export class SimpleEditorReactiveComponent implements OnDestroy, OnInit {
  value: Content;
  reactiveForm:FormGroup;
  editor: Editor;

  constructor() {
    this.value = '';
    this.reactiveForm = new FormGroup({
      content: new FormControl(this.value),
    });
    this.editor = new Editor({
      extensions: [
        StarterKit,
        HighlightExtension,
      ],
      editorProps: {
        attributes: {
          class: 'tiptap-editor',
          spellCheck: 'false',
        },
      },
    });
  }

  ngOnInit(): void {
    this.editor.on('update', () => {
      this.replacePattern();
    });

    this.replacePattern();
  }

  onClick = () => {
    const content = `[[${concepts[Math.floor(Math.random() * concepts.length)]}]]`;
    this.editor.chain().focus().insertContent(content).run();
  };

  replacePattern() {
    const { doc } = this.editor.state;
    const pattern = /\[\[(.*?)\]\]/g;
    const matches: any[] = [];
    let match;

    doc.descendants((node, pos) => {
      if (!node.isText) {
        return;
      }

      const text = node.text ?? '';

      while ((match = pattern.exec(text)) !== null) {
        matches.push({
          textContent: match[1],
          from: pos + match.index,
          to: pos + match.index + match[0].length,
        });
      }
    });

    matches.reverse().forEach(({ textContent, from, to }) => {
      this.editor.chain().focus().deleteRange({ from, to }).insertHighlight(textContent)
        .run();
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
