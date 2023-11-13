



// Modules
const modules = [
    // Accounts
    {
        moduleName:'Accounts',
        pages:[
            // Global Masters
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define Narration Master'
                    },
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Academic Year',
                            'Define Financial Year'
                        ]
                    }
                ]
            },
            // Master settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Account Master setting'
                    },
                    {
                        subPageName:'Account Petty Cash Setting'
                    },
                    {
                        subPageName:'Voucher Print Settings'
                    },
                    {
                        subPageName:'Voucher Code Settings'
                    },
                    {
                        subPageName:'Cheque Print Format Setting'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    }
                ]
            },
            // Accounts
            {
                pageName:'Accounts',
                subPages:[
                    {
                        subPageName:'Define Account Group'
                    },
                    {
                        subPageName:'Define Bank Ledger'
                    },
                    {
                        subPageName:'Define Party Ledger'
                    },
                    {
                        subPageName:'Define General Ledger'
                    },
                    {
                        subPageName:'Bank Payment Voucher'
                    },
                    {
                        subPageName:'Cash Payment Voucher'
                    },
                    {
                        subPageName:'Bank Receipt Voucher'
                    },
                    {
                        subPageName:'Cash Receipt Voucher'
                    },
                    {
                        subPageName:'Define Group Nature'
                    },
                    {
                        subPageName:'Contra Voucher'
                    },
                    {
                        subPageName:'Journal Voucher'
                    },
                    {
                        subPageName:'Payment Voucher'
                    },
                    {
                        subPageName:'Salary Payment Voucher'
                    },
                    {
                        subPageName:'Cheque Clearing'
                    },
                    {
                        subPageName:'Cheque Printing'
                    },
                    {
                        subPageName:'Voucher Image Upload'
                    }
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[
                    {
                        subPageName:'Daily Cash Status'
                    },
                    {
                        subPageName:'Bank Ledger'
                    },
                    {
                        subPageName:'Ledger Report',
                        threads:[
                            'Ledger Report',
                            'Ledger Report Detail',
                            'Ledger Report Detail New',
                            'Ledger Report With Filter'
                        ]
                    },
                    {
                        subPageName:'Cash/Bank Book'
                    },
                    {
                        subPageName:'Day Book'
                    },
                    {
                        subPageName:'Trial Balance New'
                    },
                    {
                        subPageName:'Trial Balance'
                    },
                    {
                        subPageName:'Profit & Loss'
                    },
                    {
                        subPageName:'Income & Expenditure'
                    },
                    {
                        subPageName:'Balance Sheet'
                    },
                    {
                        subPageName:'Reconciliation Statment'
                    },
                    {
                        subPageName:'Journal Ledger/Book'
                    },
                    {
                        subPageName:'Group Wise Report'
                    },
                    {
                        subPageName:'Fee Account Mismatch'
                    },
                    {
                        subPageName:'Entry Type Wise Report'
                    },
                    {
                        subPageName:'Fee Outstandig Report'
                    },
                    {
                        subPageName:'Depreciation Chart'
                    },
                    {
                        subPageName:'Depreciation Detail Item Wise'
                    },
                    {
                        subPageName:'Serialize Voucher Code'
                    }
                ]
            },
        ]
    },
    // Fees
    {
        moduleName:'Fees',
        pages:[
            // Global Masters
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define School',
                        threads:[
                            'School Global Details',
                            'Define School Board'
                        ]
                    },
                    {
                        subPageName:'Define Remark'
                    },
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Academic Year',
                            'Define Financial Year'
                        ]
                    },
                    {
                        subPageName:'Define Class Details',
                        threads:[
                            'Define Wing',
                            'Define Class',
                            'Define Section',
                            'Relate Class Section'
                        ]
                    },
                    {
                        subPageName:'Define Category'
                    },
                    {
                        subPageName:'Define Religion'
                    },
                    {
                        subPageName:'Define Caste'
                    },
                    {
                        subPageName:'Define Health Master',
                        threads:[
                            'Health Unit Master',
                            'Health Master',
                            'Student Health Entry'
                        ]
                    },
                    {
                        subPageName:'Define Bank'
                    },
                    {
                        subPageName:'Define SMS Template'
                    }
                ]
            },
            // Master Settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Global Search Option Settings'
                    },
                    {
                        subPageName:'Fee Entry Setting'
                    },
                    {
                        subPageName:'Fee Entry Setting Others'
                    },
                    {
                        subPageName:'Set Due Limit'
                    },
                    {
                        subPageName:'Fee Opening Balance Setting'
                    },
                    {
                        subPageName:'Bill Book Setting'
                    },
                    {
                        subPageName:'Generate Bill Book Details'
                    },
                    {
                        subPageName:'Bus ID Setting'
                    },
                    {
                        subPageName:'Online Payment Setting'
                    },
                    {
                        subPageName:'Update Online Data'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    },
                ]
            },
            // Fee Master
            {
                pageName:'Fee Master',
                subPages:[
                    {
                        subPageName:'Define Fee Master',
                        threads:[
                            'Define Fee Installment',
                            'Define Fee Head',
                            'Define Fee Type',
                            'Define Fee Group'
                        ]
                    },
                    {
                        subPageName:'Fee Group to Fee Head'
                    },
                    {
                        subPageName:'Assign Amount Group'
                    },
                    {
                        subPageName:'Assign Multiple Group to Student'
                    },
                    {
                        subPageName:'Define and Assign Concession',
                        threads:[
                            'Define Concession',
                            'Define Fee Head Concession',
                            'Assign Concession to Student',
                            'Define Concession Type',
                            'Assign Concession',
                            'Assign Concession to Sigle Student',
                        ]
                    },
                    {
                        subPageName:'Student Fee Details'
                    },
                    {
                        subPageName:'Assign Opening Balance'
                    },
                    {
                        subPageName:'Verify Structure'
                    },
                    {
                        subPageName:'Set Student Status'
                    },
                    {
                        subPageName:'Late Fee Settings',
                        threads:[
                            'Late Fee Setting',
                            'Late Fee Setting Head Wise',
                        ]
                    },
                    {
                        subPageName:'Assign Computer No. to Student'
                    },
                    {
                        subPageName:'Assign Roll No. to Student'
                    },
                    {
                        subPageName:'Create Students Fee Structure'
                    },
                ]
            },
            // Manage Fee
            {
                pageName:'Manage Fee',
                subPages:[
                    {
                        subPageName:'Fee Entry'
                    },
                    {
                        subPageName:'Print Fee Receipt & Certificate'
                    },
                    {
                        subPageName:'Modify Fees Receipt'
                    },
                    {
                        subPageName:'cancel Fees Receipt'
                    },
                    {
                        subPageName:'Delete Fees Receipt'
                    },
                    {
                        subPageName:'Manual Fees Modification'
                    },
                    {
                        subPageName:'Refun Head Amount'
                    },
                    {
                        subPageName:'Fee Cheque Clearing'
                    },
                    {
                        subPageName:'Fees Upload'
                    },
                    {
                        subPageName:'Fees Upload With Deposit Bank'
                    },
                    {
                        subPageName:'Amount Without Structure',
                        threads:[
                            'Pay Amount Without Structure',
                            'Pay Amount Without Structure For Staff'
                        ]
                    },
                    {
                        subPageName:'Reconsiliation Fee Receipt'
                    },
                    {
                        subPageName:'Modify Receipt Date & Bank'
                    },
                    {
                        subPageName:'Multiple Remark'
                    },
                    {
                        subPageName:'Transfer Concession'
                    },
                ]
            },
            // Transport
            {
                pageName:'Transport',
                subPages:[
                    {
                        pageName:'Travel Agency Master'
                    },
                    {
                        pageName:'Define Vehicle Type'
                    },
                    {
                        pageName:'Define Vehicle Details'
                    },
                    {
                        pageName:'Define Vehicle Route'
                    },
                    {
                        pageName:'Define Vehicle Route Relation'
                    },
                    {
                        pageName:'Define Transport Group'
                    },
                    {
                        pageName:'Define Transport Medium'
                    },
                    {
                        pageName:'Define Route Stop'
                    },
                    {
                        pageName:'Assign Transport to Students'
                    },
                    {
                        pageName:'Assign Self Transport to Students'
                    },
                ]
            },
            // Transaction Report
            {
                pageName:'Transaction Report',
                subPages:[
                    {
                        subPageName:'Collection Reports',
                        threads:[
                            'Daily Fee Collection',
                            'Daily Fee Collection List With Head Fine Filter',
                            'Daily Fee Collection Date Wise With Remark',
                            'Daily Fee Collection Date Wise',
                            'Daily Fee Collection Account Wise',
                            'Daily Fee Collection Receipt Range',
                            'Daily Fee Collection Date/Fee Group Wise',
                            'PTA Daily Fee Collection Date/Fee Group Wise',
                            'Day Wise Total Collection',
                            'Estimated Collection Report',
                            'Fee Head Wise Collection Class Range',
                            'Fee Collection Student & Class Wise',
                            'Fee Collection With Entry Time Concession',
                            'Receipt Wise Daily Collection',
                            'Receipt Wise Fee Type Collection',
                            'Month Wise Collection Report',
                            'Monthly Consolidated Report',
                            'Total Collection Report',
                            'Yearly Collection Report',
                            'Student Type Collection Report',
                        ]
                    },
                    {
                        subPageName:'Defaulter Reports',
                        threads:[
                            'Fee Defaulter List',
                            'Fee Defaulter Installment Wise',
                            'Fee Defaulter List With Head Fine Filter',
                            'Fee Defaulter Report Consolidated',
                            'Fee Defaulter Report With Receiving',
                            'Fee Defaulter Slip',
                            'Unpaid Student Report',
                            'Defaulter List Install/Head Wise',
                            'Fee Defaulter List Boarding Wise',
                        ]
                    },
                    {
                        subPageName:'Ledger Reports',
                        threads:[
                            'Annual Student Ledger 1',
                            'Annual Student Ledger 2',
                            'Annual Student Ledger 3',
                            'Student Ledger Class Wise',
                            'Fees Student Ledger',
                            'Student Ledger Class Wise With Rec. Data',
                        ]
                    },
                    {
                        subPageName:'Reconcile Reports',
                        threads:[
                            'Reconcile Report',
                            'Reconcile Installment Class Wise'
                        ]
                    },
                    {
                        subPageName:'Concession Reports',
                        threads:[
                            'Fees Concession',
                            'Fees Concession and Dues',
                            'Fees Concession and Dues Install/Head Wise'
                        ]
                    },
                    {
                        subPageName:'Cancelled Receipt Reports',
                        threads:[
                            'Fees Cheque Bounce Report',
                            'Cancelled Fees Receipt Report'
                        ]
                    },
                    {
                        subPageName:'Student Wise Receipt Report'
                    },
                    {
                        subPageName:'Uploaded Excel Details'
                    },
                    {
                        subPageName:'Amount Without Structure Reports',
                        threads:[
                            'Amount Without Structure Report',
                            'Amount Without Structure Report For Staff'
                        ]
                    },
                    {
                        subPageName:'Cheque Reports',
                        threads:[
                            'Cheque Clearing Status Report',
                            'Cheque Report Date Wise'
                        ]
                    },
                    {
                        subPageName:'Advance Payment Report'
                    },
                    {
                        subPageName:'Bad Debts Report'
                    },
                    {
                        subPageName:'Get Difference From Bank Account'
                    },
                    {
                        subPageName:'Student Amount Fee Type Wise'
                    },
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[
                    {
                        subPageName:'Student Strength',
                        threads:[
                            'Class Wise Student Strength',
                            'Student Strength Consolidated',
                            'Student Strength Ratio Wise Report',
                            'Religion/Gender Wise Student Strength',
                            'Category/Gender Wise Student Strength',
                            'Route Wise Student Strength',
                            'Ews Class Wise Strength Report',
                            'Category/Gender/Religion Wise Student Strength',
                            'Transport Student Strength Report'
                        ]
                    },
                    {
                        subPageName:'Transport Report',
                        threads:[
                            'Transport Detail',
                            'Paid Transport',
                            'Self Transport Report',
                            'Transport Report Class Wise',
                            'Assigned Transport Report',
                            'Estimated Transport Details',
                            'Print Transport ID Card',
                        ]
                    },
                    {
                        subPageName:'Student Details'
                    },
                    {
                        subPageName:'Class Wise Student Details'
                    },
                    {
                        subPageName:'Class Section Transfer Report'
                    },
                    {
                        subPageName:'Class Wise Sibling'
                    },
                    {
                        subPageName:'Class Wise Mark List'
                    },
                    {
                        subPageName:'Date Wise Admission Report'
                    },
                    {
                        subPageName:'Student House Wise Report'
                    },
                    {
                        subPageName:'Student Register Date Wise Report'
                    },
                    {
                        subPageName:'Student Health Entry Report'
                    },
                    {
                        subPageName:'Gender/Religion Wise Student Report'
                    },
                    {
                        subPageName:'Category Wise Student Report'
                    },
                    {
                        subPageName:'Opening Wise Report'
                    },
                    {
                        subPageName:'SMS Report'
                    },
                    {
                        subPageName:'Refund Amount'
                    },
                    {
                        subPageName:'Surname Wise Student Details'
                    },
                    {
                        subPageName:'Group Wise Student Details'
                    },
                    {
                        subPageName:'Active/Inactive Student Detail Report'
                    },
                    {
                        subPageName:'Staff Wise List Report'
                    },
                    {
                        subPageName:'Mid Year Student Details'
                    },
                ]
            }
        ]
    },
    // Admission
    {
        moduleName:'Admission',
        pages:[
            // Global Master
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Academic Year',
                            'Define Financial Year'
                        ]
                    },
                    {
                        subPageName:'Define TC Details',
                        threads:[
                            'Define TC Caste',
                            'Team Master'
                        ]
                    },
                    {
                        subPageName:'Possible Siblings'
                    },
                    {
                        subPageName:'Stationary Details'
                    },
                    {
                        subPageName:'Define Parish'
                    },
                    {
                        subPageName:'Define House'
                    },
                    {
                        subPageName:'Define Stream'
                    },
                    {
                        subPageName:'Define Optional Subject'
                    },
                    {
                        subPageName:'Parents Status'
                    },
                    {
                        subPageName:'Define Document Type'
                    },
                    {
                        subPageName:'Import Student'
                    }
                ]
            },
            // Master Settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Admission Setting'
                    },
                    {
                        subPageName:'Enquiry No. Setting'
                    },
                    {
                        subPageName:'Prospectus and Registration No. Setting'
                    },
                    {
                        subPageName:'Student Class Promotion'
                    },
                    {
                        subPageName:'Update Student Details'
                    },
                    {
                        subPageName:'Student Image Download'
                    },
                    {
                        subPageName:'Update Address and Blood'
                    },
                    {
                        subPageName:'Admission Form Settings'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    }
                ]
            },
            // Admission
            {
                pageName:'Admission',
                subPages:[
                    {
                        subPageName:'Enquiry'
                    },
                    {
                        subPageName:'Prospectus Entry'
                    },
                    {
                        subPageName:'Admission Form Registration'
                    },
                    {
                        subPageName:'Manual List Generation'
                    },
                    {
                        subPageName:'Student Registration'
                    },
                    {
                        subPageName:'Slot Creation'
                    },
                    {
                        subPageName:'Define Merit Criteria'
                    },
                    {
                        subPageName:'Slot Wise Point Entry'
                    },
                    {
                        subPageName:'Merit List Generation'
                    },
                    {
                        subPageName:'Re Slotting'
                    },
                    {
                        subPageName:'Upload Student Document'
                    },
                    {
                        subPageName:'Requests for Changes From Parents'
                    },
                    {
                        subPageName:'Admission Entry',
                        threads:[
                            'Admission Fee Collection',
                            'Adm Entry Amt Structure',
                            'Challan Amount'
                        ]
                    },
                    {
                        subPageName:'Create ID Card'
                    },
                    {
                        subPageName:'Generate Student Info Performa in Bulk'
                    },
                    {
                        subPageName:'Print Student Label'
                    },
                    {
                        subPageName:'Send SMS'
                    }
                ]
            },
            // Certificate
            {
                pageName:'Certificate',
                subPages:[
                    {
                        subPageName:'Certificates'
                    },
                    {
                        subPageName:'TC',
                        threads:[
                            'TC Form',
                            'TC Form Class Wise',
                            'Generate TC',
                            'Generate TC in Bulk',
                            'TC Report',
                        ]
                    },
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[
                    {
                        subPageName:'Prospectud Charges Report'
                    },
                    {
                        subPageName:'Merit List Generation'
                    },
                    {
                        subPageName:'Merit Criteria Print'
                    },
                    {
                        subPageName:'Merit List Report'
                    },
                    {
                        subPageName:'Admission Collection Report'
                    },
                    {
                        subPageName:'Slot Report'
                    },
                    {
                        subPageName:'Search and Import Online Registration'
                    },
                    {
                        subPageName:'Sibling Report'
                    },
                    {
                        subPageName:'Student House Wise Strength Report'
                    },
                    {
                        subPageName:'Student Document Details'
                    },
                    {
                        subPageName:'Class Wise Admission Report'
                    },
                    {
                        subPageName:'Student Repeater List'
                    },
                    {
                        subPageName:'Prospectud Charges Report'
                    },
                    {
                        subPageName:'Verification Admission Form'
                    },
                    {
                        subPageName:'Admission Withdrawal Register'
                    },
                    {
                        subPageName:'Total Collection Report Student Wise'
                    },
                    {
                        subPageName:'Manual List Generation Report'
                    }
                ]
            }
        ]
    },
    // Payroll
    {
        moduleName:'Payroll',
        pages:[
            // Global Masters
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Academic Year',
                            'Define Financial Year'
                        ]
                    },
                    {
                        subPageName:'Define Profession'
                    },
                    {
                        subPageName:'Define Staff Type'
                    },
                    {
                        subPageName:'Define Designation'
                    },
                    {
                        subPageName:'Define Department'
                    },
                    {
                        subPageName:'Define Staff'
                    },
                    {
                        subPageName:'Modify Staff in Bulk'
                    },
                    {
                        subPageName:'Rejoin Staff'
                    },
                    {
                        subPageName:'Define Reminder'
                    },
                    {
                        subPageName:'Assign Transport to Staff'
                    },
                    {
                        subPageName:'Report Settings'
                    },
                ]
            },
            // Master Settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Define Global Settings'
                    },
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    }
                ]
            },
            // Payroll Master
            {
                pageName:'Payroll Master',
                subPages:[
                    {
                        subPageName:'Define Salary Account'
                    },
                    {
                        subPageName:'Define Salary Month'
                    },
                    {
                        subPageName:'Assign Info Bulk'
                    },
                    {
                        subPageName:'Create Salary Structure',
                        threads:[
                            'Define Salary Head',
                            'Relate Static Dynamic Heads',
                            'Define Salary Group',
                            'Assign Salary Head to Group',
                            'Assign Salary Group to Staff',
                            'Bulk Salary Head Assign',
                            'Bulk Salary Head Entry',
                            'Bulk Head Remark Entry',
                        ]
                    },
                    {
                        subPageName:'TDS Configuration',
                        threads:[
                            'Define Income Tax Slab',
                            'Define ID Head Groups',
                            'Define ID Head',
                            'Define TDS Deductee'
                        ]
                    },
                    {
                        subPageName:'Pay Scale Configuration',
                        threads:[
                            'Define Pay Scale',
                            'Define Pay Scale Amount',
                            'Define Grade Pay',
                            'Define Fixation',
                            'Assign Pay Scale to Staff'
                        ]
                    },
                    {
                        subPageName:'Generate Barcode'
                    },
                    {
                        subPageName:'Insurance',
                        threads:[
                            'Insurance Vender',
                            'Relate Policy with Employee',
                            'Related Policies with Month',
                        ]
                    },
                ]
            },
            // Advance
            {
                pageName:'Advance',
                subPages:[
                    {
                        subPageName:'Fix Advance A/C'
                    },
                    {
                        subPageName:'Advance Entry'
                    },
                    {
                        subPageName:'Advance Repayment'
                    },
                    {
                        subPageName:'Advance Report',
                        threads:[
                            'Advance Entry Report',
                            'Advance Repayment Report',
                            'Advance Ledger Report'
                        ]
                    },
                ]
            },
            // Salary Structure
            {
                pageName:'Salary Structure',
                subPages:[
                    {
                        subPageName:'Leave LWP Manual'
                    },
                    {
                        subPageName:'Occasional Allowance/Deduction'
                    },
                    {
                        subPageName:'Salary Generation'
                    },
                    {
                        subPageName:'Bank Statement'
                    },
                    {
                        subPageName:'Insurance Statement'
                    },
                    {
                        subPageName:'Due Statement'
                    },
                    {
                        subPageName:'IT Head Entry'
                    },
                    {
                        subPageName:'TDS Entry'
                    },
                    {
                        subPageName:'Daily Wages Attendance'
                    },
                    {
                        subPageName:'Gratuity Calculations'
                    },
                    {
                        subPageName:'Bonus Calculations'
                    },
                    {
                        subPageName:'Increment',
                        threads:[
                            'Auto Increment',
                            'Increment Rollback',
                        ]
                    },
                    {
                        subPageName:'Staff Salary Structure'
                    },
                    {
                        subPageName:'Generate Salary Status'
                    }
                ]
            },
            // Salary Reports
            {
                pageName:'Salary Reports',
                subPages:[
                    {
                        subPageName:'Bank Statement Report'
                    },
                    {
                        subPageName:'Salary Sheet'
                    },
                    {
                        subPageName:'Salary Slip'
                    },
                    {
                        subPageName:'Insurance Statement Report'
                    },
                    {
                        subPageName:'Income Tax',
                        threads:[
                            'TDS Entry Report',
                            'Quarterly Form 24Q',
                            'TDS 24Q',
                            'Gross Form 16',
                            'Form 16'
                        ]
                    },
                    {
                        subPageName:'Employee Type Wise Report'
                    },
                    {
                        subPageName:'Estimated Salary Report'
                    },
                    {
                        subPageName:'Monthly Reports',
                        threads:[
                            'Department Wise Report',
                            'Consolidated Salary Statment',
                            'Gross Salary Report',
                            'Month Wise Salary Report',
                            'Monthly Summary Report',
                            'Head Wise Gross Salary Report',
                            'Staff Statement'
                        ]
                    },
                    {
                        subPageName:'Yearly Reports',
                        threads:[
                            'Reconciliation Report',
                            'Annual Salary Paid Report',
                            'Salary Statement Employee Wise',
                            'Salary Statement Report'
                        ]
                    },
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[
                    {
                        subPagesName:'Employee Statistics'
                    },
                    {
                        subPagesName:'ESI Report'
                    },
                    {
                        subPagesName:'PF Report'
                    },
                    {
                        subPagesName:'PF Challan Report'
                    },
                    {
                        subPagesName:'Increment Report'
                    },
                    {
                        subPagesName:'GSLI Report'
                    },
                    {
                        subPagesName:'Gratuity Report'
                    },
                    {
                        subPagesName:'Salary Compare'
                    },
                    {
                        subPagesName:'Professional Tax'
                    },
                    {
                        subPagesName:'Super Annuciation Report'
                    },
                    {
                        subPagesName:'MACP List'
                    },
                    {
                        subPagesName:'Fixation Report'
                    },
                    {
                        subPagesName:'Date range Retirement Report'
                    },
                    {
                        subPagesName:'Retirement Report'
                    },
                    {
                        subPagesName:'Pension List'
                    },
                    {
                        subPagesName:'Experience Certificate Report'
                    },
                    {
                        subPagesName:'Comparison Report'
                    },
                    {
                        subPagesName:'Employee Bio Data'
                    }
                ]
            }
        ]
    },
    // Stocks
    {
        moduleName:'Stocks',
        pages:[
            // Global Masters
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Financial Year',
                            'Define Academic Year',
                        ]
                    },
                    {
                        subPageName:'Define Item Category'
                    },
                    {
                        subPageName:'Define Items Sub Category'
                    },
                    {
                        subPageName:'Define Unit'
                    },
                    {
                        subPageName:'Define Item'
                    },
                    {
                        subPageName:'Define Brand Name'
                    },
                    {
                        subPageName:'Define GST Slab'
                    },
                    {
                        subPageName:'Relate Item With GST Slab'
                    }
                ]
            },
            // Master Settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Stock Master Setting'
                    },
                    {
                        subPageName:'Notification Scheduler'
                    },
                    {
                        subPageName:'Set Stock Reminder Details'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    }
                ]
            },
            // Stock
            {
                pageName:'Stock',
                subPages:[
                    {
                        subPageName:'Asset Opening Entry'
                    },
                    {
                        subPageName:'Opening Qty'
                    },
                    {
                        subPageName:'Requisition Order'
                    },
                    {
                        subPageName:'Purchase Order'
                    },
                    {
                        subPageName:'Purchase Return Entry'
                    },
                    {
                        subPageName:'Stock in Entry'
                    },
                    {
                        subPageName:'Stock Bill Entry'
                    },
                    {
                        subPageName:'Stock Issue'
                    },
                    {
                        subPageName:'Multiple Stock Issue'
                    },
                    {
                        subPageName:'Stock Return'
                    },
                    {
                        subPageName:'Stock Return Item Wise'
                    },
                    {
                        subPageName:'Stock Destroy'
                    }
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[
                    {
                        subPageName:'Stock Opening Report'
                    },
                    {
                        subPageName:'Purchase Order Report'
                    },
                    {
                        subPageName:'Stock in Report'
                    },
                    {
                        subPageName:'Bill Report'
                    },
                    {
                        subPageName:'Employee Issue Report'
                    },
                    {
                        subPageName:'Employee Return Report'
                    },
                    {
                        subPageName:'Stock Issue Report'
                    },
                    {
                        subPageName:'Other Return Report'
                    },
                    {
                        subPageName:'Stock Ledger'
                    },
                    {
                        subPageName:'Cumulative Stock Statement Value Wise'
                    },
                    {
                        subPageName:'Active Stock'
                    },
                    {
                        subPageName:'Max Stock Report'
                    },
                    {
                        subPageName:'Min Stock Report'
                    },
                    {
                        subPageName:'Challan Report'
                    },
                    {
                        subPageName:'Item Master Report'
                    },
                    {
                        subPageName:'Purchase Return Report'
                    },
                    {
                        subPageName:'Stock Destroy Report'
                    }
                ]
            }
        ]
    },
    // Users
    {
        moduleName:'Users',
        pages:[
            // Global Master
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Academic Year',
                            'Define Financial Year'
                        ]
                    }
                ]
            },
            // Master Settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    }
                ]
            },
            // Manage Users
            {
                pageName:'Manage Users',
                subPages:[
                    {
                        subPageName:'Create User'
                    },
                    {
                        subPageName:'Fee Type Assign to User'
                    },
                    {
                        subPageName:'User Permission'
                    },
                    {
                        subPageName:'Create Role'
                    },
                    {
                        subPageName:'User Role'
                    }
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[]
            }
        ]
    },
    // Attendance
    {
        moduleName:'Attendance',
        pages:[
            // Global Masters
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Academic Year',
                            'Define Financial Year'
                        ]
                    },
                    {
                        subPageName:'Define Holiday'
                    },
                    {
                        subPageName:'Define Leave'
                    },
                    {
                        subPageName:'Define Shift Master'
                    },
                    {
                        subPageName:'Attendance Settings'
                    },
                    {
                        subPageName:'Report Settings'
                    },
                    {
                        subPageName:'Employee Enrollment'
                    },
                    {
                        subPageName:'Mark Attendance'
                    }
                ]
            },
            // Master Settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    },
                ]
            },
            // Attendance
            {
                pageName:'Attendance',
                subPages:[
                    {
                        subPageName:'Assign Leave to Staff'
                    },
                    {
                        subPageName:'Modify Staff in Bulk'
                    },
                    {
                        subPageName:'Staff Shift Relation'
                    },
                    {
                        subPageName:'Auto Process Attendance'
                    },
                    {
                        subPageName:'Mark Manual Attendance'
                    },
                    {
                        subPageName:'Upload Attendance'
                    },
                    {
                        subPageName:'Process Leave Application'
                    },
                    {
                        subPageName:'Process Leave'
                    },
                    {
                        subPageName:'Reprocess Attendance'
                    },
                    {
                        subPageName:'Leave Acceptance Employee Wise'
                    },
                    {
                        subPageName:'Mark Leave Staff Type Wise'
                    },
                    {
                        subPageName:'Leave Marking'
                    },
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[
                    {
                        subPageName:'Daily Reports',
                        threads:[
                            'Late in Early out Report',
                            'Attendance Consolidated Report',
                            'Staff Wise Daily Attendance Report',
                            'Absent/Missing Attendance Report',
                            'Biometrics Attendance Detail Department Wise',
                            'Weekly Attendance Report',
                            'Daily Performance Report',
                            'Attendance Report'
                        ]
                    },
                    {
                        subPageName:'Monthly Reports',
                        threads:[
                            'Attendance Report Monthly Wise',
                            'Monthly Attendance Report',
                            'Monthly Performance Report',
                            'School Staff Attendance Register',
                            'Monthly Late in Count Report',
                            'Monthly Consolidated Biometric Report',
                        ]
                    },
                    {
                        subPageName:'Leave Reports',
                        threads:[
                            'Leave Format Report',
                            'Leave Balance Report',
                            'Sanctioned Leave Report',
                            'Leave Card Report',
                            'Leave Ledger Report',
                            'Leave Register Report',
                            'Leave Bucket Report'
                        ]
                    },
                    {
                        subPageName:'Other Reports',
                        threads:[
                            'Staff Shift Relation Report',
                            'Attendance Analysis Report',
                            'LWP Year Wise Report',
                        ]
                    }
                ]
            }
        ]
    },
    // Time Table
    {
        moduleName:'Time Table',
        pages:[
            // Global Masters
            {
                pageName:'Global Masters',
                subPages:[
                    {
                        subPageName:'Define Session',
                        threads:[
                            'Define Academic Year',
                            'Define Financial Year'
                        ]
                    },
                ]
            },
            // Master Settings
            {
                pageName:'Master Settings',
                subPages:[
                    {
                        subPageName:'Change Academic'
                    },
                    {
                        subPageName:'Report Layout Setting'
                    },
                    {
                        subPageName:'Session Transfer'
                    },
                ]
            },
            // Relation Master
            {
                pageName:'Relation Master',
                subPages:[
                    {
                        subPageName:'Timetable Global Setting'
                    },
                    {
                        subPageName:'Teacher Setting'
                    },
                    {
                        subPageName:'Class Setting'
                    },
                    {
                        subPageName:'Define Subject'
                    },
                    {
                        subPageName:'Assign Subject to Class'
                    },
                    {
                        subPageName:'Period Allotment'
                    },
                    {
                        subPageName:'Define Resource'
                    },
                    {
                        subPageName:'Relate Resource to Subject'
                    },
                    {
                        subPageName:'Class Teacher Subject'
                    },
                    {
                        subPageName:'Define Class Teacher'
                    },
                    {
                        subPageName:'Period Time Setting'
                    },
                ]
            },
            // Constraints Master
            {
                pageName:'Constraints Master',
                subPages:[
                    {
                        subPageName:'Parallel Allocation'
                    },
                    {
                        subPageName:'Fixed Allocation'
                    },
                    {
                        subPageName:'Consecutive Allocation'
                    },
                    {
                        subPageName:'Preference Allocation'
                    }
                ]
            },
            // Create Timetable
            {
                pageName:'Create Timetable',
                subPages:[
                    {
                        subPageName:'Auto Generate Timetable'
                    },
                    {
                        subPageName:'View and Modify Timetable'
                    },
                    {
                        subPageName:'Replace Teacher'
                    },
                    {
                        subPageName:'Assign One Teacher Timetable to Another'
                    },
                    {
                        subPageName:'Modify Timetable'
                    }
                ]
            },
            // Substitution Master
            {
                pageName:'Substitution Master',
                subPages:[
                    {
                        subPageName:'Mark Attendance'
                    },
                    {
                        subPageName:'Substitution'
                    }
                ]
            },
            // Reports
            {
                pageName:'Reports',
                subPages:[
                    {
                        subPageName:'Class Timetable Details'
                    },
                    {
                        subPageName:'Teacher Timetable Details'
                    },
                    {
                        subPageName:'Subject Details'
                    },
                    {
                        subPageName:'Class Teacher Details'
                    },
                    {
                        subPageName:'Master Requirement'
                    },
                    {
                        subPageName:'Parallel Allocation Details'
                    },
                    {
                        subPageName:'Subject Wise Teacher Details'
                    },
                    {
                        subPageName:'Wing Wise Teacher Details'
                    },
                    {
                        subPageName:'Consecutive Allocation Details'
                    },
                    {
                        subPageName:'Class and Resource Details'
                    },
                    {
                        subPageName:'Week Wise Free Teacher Details'
                    },
                    {
                        subPageName:'Class Timetable Details'
                    },
                    {
                        subPageName:'Unallocated Period Details'
                    },
                    {
                        subPageName:'Day Wise Free Teacher Details'
                    },
                    {
                        subPageName:'Class and Subject Taught'
                    },
                    {
                        subPageName:'Teachers Work Load Details'
                    },
                    {
                        subPageName:'Day Wise Free Teacher Details'
                    },
                    {
                        subPageName:'Resource Timetable Details'
                    },
                    {
                        subPageName:'Particular Class Timetable Details'
                    },
                    {
                        subPageName:'Class Wise Teacher Allocation Details'
                    },
                    {
                        subPageName:'Date Wise Substitution Details'
                    },
                    {
                        subPageName:'Assignment Status'
                    },
                    {
                        subPageName:'Subject Summary'
                    },
                    {
                        subPageName:'Subject Wise Teacher Allocation Details'
                    },
                    {
                        subPageName:'Show Timetable at Glance'
                    }
                ]
            }
        ]
    }
];





// Export
export default modules;