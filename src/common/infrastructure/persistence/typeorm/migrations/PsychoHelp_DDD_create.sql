-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2021-11-02 23:04:27.528

-- tables
-- Table: Appointment
CREATE TABLE Appointment (
    CAppointment int  NOT NULL,
    DCreatedAt datetime  NOT NULL,
    DAppointment datetime  NOT NULL,
    TPsychologistNotes varchar(500)  NULL,
    CPatient int  NOT NULL,
    CPsychologist int  NOT NULL,
    CONSTRAINT Appointment_pk PRIMARY KEY (CAppointment)
);

-- Table: Bill
CREATE TABLE Bill (
    CBill int  NOT NULL,
    DBill datetime  NOT NULL,
    MAmount float  NOT NULL,
    NumRUC int  NULL,
    CPatient int  NOT NULL,
    CONSTRAINT Bill_pk PRIMARY KEY (CBill)
);

-- Table: Logbook
CREATE TABLE Logbook (
    CLogbook int  NOT NULL,
    NLogbook varchar(50)  NOT NULL,
    TDescription varchar(250)  NOT NULL,
    TConsultationReason varchar(250)  NOT NULL,
    TPersonalHistory varchar(500)  NOT NULL,
    TTestsPerformed varchar(500)  NOT NULL,
    TSessionHistory varchar(1000)  NOT NULL,
    CPsychologist int  NOT NULL,
    CONSTRAINT Logbook_pk PRIMARY KEY (CLogbook)
);

-- Table: Logbook_Treatment
CREATE TABLE Logbook_Treatment (
    CTreatment int  NOT NULL,
    CLogbook int  NOT NULL,
    CONSTRAINT Logbook_Treatment_pk PRIMARY KEY (CTreatment,CLogbook)
);

-- Table: Patient
CREATE TABLE Patient (
    CPatient int  NOT NULL,
    TUsername varchar(16)  NOT NULL,
    TPassword char(60)  NOT NULL,
    NFirstName varchar(50)  NOT NULL,
    NLastName varchar(50)  NOT NULL,
    TEmail varchar(50)  NOT NULL,
    DCreatedAt datetime  NOT NULL,
    CONSTRAINT Patient_pk PRIMARY KEY (CPatient)
);

-- Table: Patient_Logbook
CREATE TABLE Patient_Logbook (
    CLogbook int  NOT NULL,
    CPatient int  NOT NULL,
    DAddedAt datetime  NOT NULL,
    CONSTRAINT Patient_Logbook_pk PRIMARY KEY (CLogbook,CPatient)
);

-- Table: Payment_Method
CREATE TABLE Payment_Method (
    CPayment_Method int  NOT NULL,
    TCardType varchar(50)  NOT NULL,
    NumExpirationMonth int  NOT NULL,
    NumExpirationYear int  NOT NULL,
    NumSecurityCode int  NOT NULL,
    NOwnerFirstName varchar(100)  NOT NULL,
    NOwnerLastName varchar(100)  NOT NULL,
    NCity varchar(50)  NOT NULL,
    TBillingAddress varchar(200)  NOT NULL,
    TReference varchar(200)  NOT NULL,
    NumPostalCode int  NOT NULL,
    NCountry varchar(50)  NOT NULL,
    NumPhone int  NOT NULL,
    CPatient int  NOT NULL,
    CONSTRAINT Payment_Method_pk PRIMARY KEY (CPayment_Method)
);

-- Table: Professional_Profile
CREATE TABLE Professional_Profile (
    CProfessional_Profile int  NOT NULL,
    TExperienceDescription varchar(500)  NOT NULL,
    CPsychologist int  NOT NULL,
    CONSTRAINT Professional_Profile_pk PRIMARY KEY (CProfessional_Profile)
);

-- Table: Professional_Specialties
CREATE TABLE Professional_Specialties (
    CProfessional_Profile int  NOT NULL,
    CSpecialty int  NOT NULL,
    CONSTRAINT Professional_Specialties_pk PRIMARY KEY (CProfessional_Profile)
);

-- Table: Psychologist
CREATE TABLE Psychologist (
    CPsychologist int  NOT NULL,
    TUsername varchar(16)  NOT NULL,
    TPassword char(60)  NOT NULL,
    NFirstName varchar(50)  NOT NULL,
    NLastName varchar(50)  NOT NULL,
    TEmail varchar(50)  NOT NULL,
    NumCPP int  NOT NULL,
    DCreatedAt datetime  NOT NULL,
    CONSTRAINT Psychologist_pk PRIMARY KEY (CPsychologist)
);

-- Table: Specialty
CREATE TABLE Specialty (
    CSpecialty int  NOT NULL,
    NSpeciality varchar(50)  NOT NULL,
    NInstitution varchar(50)  NOT NULL,
    CONSTRAINT Specialty_pk PRIMARY KEY (CSpecialty)
);

-- Table: Treatment
CREATE TABLE Treatment (
    CTreatment int  NOT NULL,
    TTitle varchar(50)  NOT NULL,
    TDescription varchar(500)  NOT NULL,
    DCreatedAt datetime  NOT NULL,
    CONSTRAINT Treatment_pk PRIMARY KEY (CTreatment)
);

-- foreign keys
-- Reference: appointment_patient (table: Appointment)
ALTER TABLE Appointment ADD CONSTRAINT appointment_patient
    FOREIGN KEY (CPatient)
    REFERENCES Patient (CPatient)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: appointment_psychologist (table: Appointment)
ALTER TABLE Appointment ADD CONSTRAINT appointment_psychologist
    FOREIGN KEY (CPsychologist)
    REFERENCES Psychologist (CPsychologist)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: bill_patient (table: Bill)
ALTER TABLE Bill ADD CONSTRAINT bill_patient
    FOREIGN KEY (CPatient)
    REFERENCES Patient (CPatient)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: logbook_psychologist (table: Logbook)
ALTER TABLE Logbook ADD CONSTRAINT logbook_psychologist
    FOREIGN KEY (CPsychologist)
    REFERENCES Psychologist (CPsychologist)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: logbook_treatment_logbook (table: Logbook_Treatment)
ALTER TABLE Logbook_Treatment ADD CONSTRAINT logbook_treatment_logbook
    FOREIGN KEY (CLogbook)
    REFERENCES Logbook (CLogbook)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: logbook_treatment_treatment (table: Logbook_Treatment)
ALTER TABLE Logbook_Treatment ADD CONSTRAINT logbook_treatment_treatment
    FOREIGN KEY (CTreatment)
    REFERENCES Treatment (CTreatment)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: patient_logbook_logbook (table: Patient_Logbook)
ALTER TABLE Patient_Logbook ADD CONSTRAINT patient_logbook_logbook
    FOREIGN KEY (CLogbook)
    REFERENCES Logbook (CLogbook)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: patient_logbook_patient (table: Patient_Logbook)
ALTER TABLE Patient_Logbook ADD CONSTRAINT patient_logbook_patient
    FOREIGN KEY (CPatient)
    REFERENCES Patient (CPatient)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: payment_method_patient (table: Payment_Method)
ALTER TABLE Payment_Method ADD CONSTRAINT payment_method_patient
    FOREIGN KEY (CPatient)
    REFERENCES Patient (CPatient)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: professional_profile_psychologist (table: Professional_Profile)
ALTER TABLE Professional_Profile ADD CONSTRAINT professional_profile_psychologist
    FOREIGN KEY (CPsychologist)
    REFERENCES Psychologist (CPsychologist)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: professional_specialties_professional_profile (table: Professional_Specialties)
ALTER TABLE Professional_Specialties ADD CONSTRAINT professional_specialties_professional_profile
    FOREIGN KEY (CProfessional_Profile)
    REFERENCES Professional_Profile (CProfessional_Profile)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: professional_specialties_specialty (table: Professional_Specialties)
ALTER TABLE Professional_Specialties ADD CONSTRAINT professional_specialties_specialty
    FOREIGN KEY (CSpecialty)
    REFERENCES Specialty (CSpecialty)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

