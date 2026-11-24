export const quizzes = [
  {
    id: 'workplace-ethics',
    title: 'Workplace Ethics',
    category: 'Workplace Ethics',
    difficulty: 'Intermediate',
    totalQuestions: 10,
    estimatedDuration: '8 mins',
    xpReward: 300,
    accentColor: 'purple',
    badgeVariant: 'tag-purple',
    description: 'Master ethical decision-making, conflict of interest rules, data confidentiality, and whistleblower protections in corporate environments.',
    questions: [
      {
        id: 1,
        question: 'A preferred software vendor invites you to an all-expenses-paid weekend retreat at a luxury resort right before an upcoming contract renewal. What is the most ethically appropriate response?',
        options: [
          'Accept the trip as long as you do not discuss contract pricing during the retreat',
          'Decline the invitation and promptly disclose the offer to your compliance officer or manager',
          'Accept the trip but bring another team member along for full transparency',
          'Ask the vendor to convert the monetary value of the trip into a personal cash bonus'
        ],
        correctAnswer: 1,
        explanation: 'Company gifts, luxury trips, and lavish hospitality that could influence or appear to influence business decisions violate corporate conflict of interest policies. Immediate disclosure and polite refusal uphold organizational integrity.'
      },
      {
        id: 2,
        question: 'You discover that a department manager is altering quarterly financial and operational records to artificially hit executive bonuses. What is the correct procedure according to ethical standards?',
        options: [
          'Confront the senior manager publicly in the next department all-hands meeting',
          'Disregard the issue since executive financial reporting falls outside your job description',
          'Report the incident through the confidential compliance hotline or internal audit channels',
          'Post details anonymously on public social media forums to warn company shareholders'
        ],
        correctAnswer: 2,
        explanation: 'Internal compliance channels, whistleblowing hotlines, and ombudspersons provide confidential, legally protected avenues to report financial irregularities without fear of retaliation.'
      },
      {
        id: 3,
        question: 'While working from a busy airport lounge or public café, you need to review unannounced employee salary adjustments and performance ratings. What should you do?',
        options: [
          'Angle your laptop screen slightly and continue reviewing the sensitive compensation spreadsheet',
          'Wait until you are connected to a secure private network with a privacy screen in a secluded workspace',
          'Forward the confidential spreadsheet to your personal email to browse on your phone',
          'Ask neighboring travelers to close their eyes while you finish your task'
        ],
        correctAnswer: 1,
        explanation: 'Confidential compensation and HR records must never be exposed in public areas where shoulder-surfing or unsecured Wi-Fi poses a data privacy breach risk.'
      },
      {
        id: 4,
        question: 'During company working hours and using your company-issued workstation, you develop software code for a personal freelance client. Who legally owns this intellectual property?',
        options: [
          'You own it exclusively because freelance side projects represent personal creative expression',
          'The company owns it because company time, hardware, and facilities were utilized in its creation',
          'The freelance client owns it automatically regardless of where or how it was developed',
          'Ownership is shared equally between your company, the client, and yourself'
        ],
        correctAnswer: 1,
        explanation: 'Proprietary Information and Inventions Agreements stipulate that intellectual property created using company time, facilities, or equipment belongs to the employer.'
      },
      {
        id: 5,
        question: 'An employee files a formal grievance alleging discriminatory treatment by a team supervisor. Shortly after, the supervisor demotes the employee to graveyard shifts. This action is:',
        options: [
          'A legitimate exercise of managerial discretion to separate conflicting team members',
          'Acceptable only if the internal grievance investigation has already concluded',
          'Unlawful retaliation that strictly violates company anti-retaliation and ethics policies',
          'A routine scheduling adjustment that cannot be legally or ethically challenged'
        ],
        correctAnswer: 2,
        explanation: 'Adverse employment actions taken against an employee for reporting misconduct in good faith constitute prohibited retaliation under labor laws and workplace ethics codes.'
      },
      {
        id: 6,
        question: 'You learn in a confidential leadership meeting that your company is acquiring a prominent competitor before any public press release. What are you legally and ethically prohibited from doing?',
        options: [
          'Preparing project integration plans with your direct internal collaborators',
          'Buying or selling company stock or tipping off friends and family based on this non-public information',
          'Congratulating internal executive sponsors on achieving an important milestone',
          'Updating your personal task manager to organize upcoming post-merger workflows'
        ],
        correctAnswer: 1,
        explanation: 'Trading securities or sharing material non-public information (insider tipping) violates federal securities regulations and company insider trading policies, carrying severe civil and criminal penalties.'
      },
      {
        id: 7,
        question: 'You attend a solo business dinner while traveling. The bill comes to $32, but the daily corporate meal per diem allows up to $75. What amount should you claim on your expense report?',
        options: [
          'Claim $75 because the corporate policy budget already approved that maximum allowance',
          'Claim $32 for the actual, substantiated business meal expense incurred',
          'Claim $55 to split the difference between the actual receipt and the maximum per diem',
          'Add fabricated transportation tips to your receipt to reach the $75 threshold'
        ],
        correctAnswer: 1,
        explanation: 'Expense reimbursements require accurate reporting of actual, necessary business expenses incurred. Submitting inflated or fictional receipts constitutes expense fraud.'
      },
      {
        id: 8,
        question: 'A newly hired engineer offers to share proprietary product roadmaps and trade secrets from their previous employer to accelerate your team roadmap. How must you respond?',
        options: [
          'Accept the confidential files immediately to give your department a competitive advantage',
          'Store the files on an offline flash drive to avoid corporate cloud security monitors',
          'Firmly refuse the proprietary materials and report the incident to Legal and Compliance',
          'Paraphrase the competitor files into slide decks without attributing the original source'
        ],
        correctAnswer: 2,
        explanation: 'Soliciting, accepting, or utilizing proprietary materials and trade secrets from competing organizations violates trade secret laws and corporate ethical standards.'
      },
      {
        id: 9,
        question: 'You strongly disagree with a recent corporate policy change and want to voice your opinion online. What does the company code of conduct require regarding social media?',
        options: [
          'Post disparaging remarks using an anonymous pseudonym on company-owned laptops',
          'Use internal feedback channels and adhere to social media policies without leaking confidential business information',
          'Post complaints publicly while falsely claiming to officially represent corporate leadership',
          'Contact corporate clients directly on LinkedIn urging them to protest the policy'
        ],
        correctAnswer: 1,
        explanation: 'Employees must safeguard proprietary data, refrain from unauthorized representation of the brand, and leverage internal constructive channels to address grievances.'
      },
      {
        id: 10,
        question: 'During candidate evaluations, an interviewer recommends rejecting a qualified candidate because they "might not fit our young, late-night party culture." How should the hiring panel respond?',
        options: [
          'Agree with the recommendation because cultural homogeneity guarantees team velocity',
          'Refocus the evaluation objectively on job-relevant skills, qualifications, and core competencies',
          'Offer the candidate a lower base salary to assess their commitment to the culture',
          'Subject the candidate to an informal social bar interview to test their social stamina'
        ],
        correctAnswer: 1,
        explanation: 'Hiring evaluations must remain objective and merit-based, grounded in demonstrable skills rather than subjective, exclusionary, or age-biased lifestyle assumptions.'
      }
    ]
  },
  {
    id: 'effective-communication',
    title: 'Effective Communication',
    category: 'Effective Communication',
    difficulty: 'Beginner',
    totalQuestions: 10,
    estimatedDuration: '7 mins',
    xpReward: 250,
    accentColor: 'blue',
    badgeVariant: 'tag-blue',
    description: 'Enhance your active listening, constructive feedback, non-verbal presence, and cross-functional conflict resolution capabilities.',
    questions: [
      {
        id: 1,
        question: 'During a sprint planning meeting, a colleague voices concern about an unrealistic launch timeline. What active listening response demonstrates the highest empathy and clarity?',
        options: [
          'Interrupt them immediately to remind them that everyone across the company is under high pressure',
          '"It sounds like the current deliverables are creating significant bottlenecks. Which milestones should we prioritize together?"',
          'Silently check your unread notifications while nodding occasionally to pretend you are engaged',
          'Tell them to escalate their complaint in writing to executive leadership next quarter'
        ],
        correctAnswer: 1,
        explanation: 'Active listening involves paraphrasing the speaker core concern, validating their lived experience, and asking collaborative clarifying questions to unlock solutions.'
      },
      {
        id: 2,
        question: 'When delivering constructive feedback to an employee using the SBI framework, what do the letters S-B-I represent?',
        options: [
          'Status, Budget, Implementation',
          'Situation, Behavior, Impact',
          'Strategy, Benchmark, Incentive',
          'Severity, Blame, Instruction'
        ],
        correctAnswer: 1,
        explanation: 'The SBI model anchors feedback in the specific Situation (context), the observable Behavior (actions taken), and the measurable Impact (results on peers and goals), minimizing defensiveness.'
      },
      {
        id: 3,
        question: 'You need to follow up on a critical overdue deliverable with a peer from another department. Which written communication sets a professional and collaborative tone?',
        options: [
          '"WHY IS THIS DELAYED? YOU ARE BLOCKING OUR ENTIRE SPRINT."',
          '"Per my previous 4 emails that you ignored, you are jeopardizing our release."',
          '"Hi Alex, checking in on the API documentation status. Let me know if you need any unblocking from our end to help hit tomorrow’s target."',
          '"If this is not done by noon, I am reporting your lack of responsiveness to your vice president."'
        ],
        correctAnswer: 2,
        explanation: 'Constructive workplace messaging combines clear expectations and timelines with offers of mutual assistance, maintaining accountability while preserving cross-team goodwill.'
      },
      {
        id: 4,
        question: 'In a remote video conference with cross-functional stakeholders, which non-verbal cue most effectively conveys engagement and trust?',
        options: [
          'Positioning the webcam at eye level, maintaining periodic lens focus, and providing affirmative nods',
          'Keeping the camera off permanently while typing audibly on a mechanical keyboard',
          'Leaning far back with folded arms while continuously looking at a secondary monitor',
          'Frequently checking mobile phone notifications with microphone unmuted'
        ],
        correctAnswer: 0,
        explanation: 'Looking toward the camera lens simulates natural eye contact in virtual meetings, while an open upright posture and conscious nodding convey active attentiveness.'
      },
      {
        id: 5,
        question: 'Two senior team members disagree sharply over technical architecture, deadlocking project progress. What is the most constructive communication technique to resolve this?',
        options: [
          'Let the louder or more senior person dictate the decision to expedite development',
          'Facilitate a structured review mapping both proposals against defined requirements, scalability, and maintenance costs',
          'Avoid the discussion entirely until one engineer concedes out of sheer exhaustion',
          'Call an emergency team vote without analyzing the technical trade-offs of either option'
        ],
        correctAnswer: 1,
        explanation: 'Depersonalizing disagreements by measuring alternatives against objective criteria and shared organizational goals resolves deadlocks constructively without alienating teammates.'
      },
      {
        id: 6,
        question: 'A severe production service outage occurs during peak business hours. What is the fundamental communication rule during an active crisis?',
        options: [
          'Speculate publicly on social media channels about potential root causes to look transparent',
          'Assign public blame immediately so the organization knows which engineer caused the failure',
          'Establish a single communication channel with concise, verified, timestamped status updates',
          'Refuse to provide updates to leadership and customers until the issue is 100% resolved'
        ],
        correctAnswer: 2,
        explanation: 'Incident communication requires a centralized single source of truth delivering factual, regular status updates to align engineering teams and manage stakeholder expectations.'
      },
      {
        id: 7,
        question: 'When communicating across multicultural global teams spanning multiple continents and time zones, what is an essential communication practice?',
        options: [
          'Use colloquial sports idioms and regional slang to make the conversation feel casual',
          'Use clear, plain language, document agreements asynchronously in writing, and respect local working hours',
          'Demand that international colleagues attend recurring sync meetings at 3:00 AM their local time',
          'Assume that silence on a conference call indicates total agreement with every proposal'
        ],
        correctAnswer: 1,
        explanation: 'Inclusive cross-cultural communication minimizes idioms, emphasizes structured asynchronous documentation, and respects geographic boundaries and cognitive styles.'
      },
      {
        id: 8,
        question: 'You must communicate to a team that their quarterly project budget has been reduced by 30%. How should you deliver this challenging update?',
        options: [
          'Send a one-sentence message in a crowded Slack channel right before leaving for the weekend',
          'Convene a direct meeting to explain the strategic organizational context transparently, discuss impact, and field questions with empathy',
          'Conceal the budget cuts until suppliers decline company purchase orders',
          'Cast complete blame onto the finance department without explaining the broader business factors'
        ],
        correctAnswer: 1,
        explanation: 'Delivering difficult organizational news requires timely, direct, and empathetic communication that provides transparent context, addresses concerns, and charts next steps.'
      },
      {
        id: 9,
        question: 'What is the most effective operational habit to guarantee that a 30-minute team meeting generates real business value?',
        options: [
          'Inviting 25 participants without attaching an agenda or expected meeting outcomes',
          'Circulating a concise agenda with clear objectives beforehand, and concluding with assigned action items and owners',
          'Allowing random tangents to consume the session without timeboxing topics',
          'Extending the meeting by 30 minutes every time participants run over schedule'
        ],
        correctAnswer: 1,
        explanation: 'Productive meetings rely on deliberate preparation, clear objectives, disciplined facilitation, and explicit documentation of post-meeting action owners and deadlines.'
      },
      {
        id: 10,
        question: 'A talented but reserved team member rarely speaks during fast-paced brainstorming meetings. How can a project lead effectively unlock their input?',
        options: [
          'Put them on the spot aggressively: "Why do you never say anything in our meetings?"',
          'Provide multimodal input channels, including shared collaborative docs and asynchronous comments, and invite their perspective warmly',
          'Conclude that they lack valuable ideas and focus exclusively on the most vocal contributors',
          'Speak and vote on their behalf without consulting them beforehand'
        ],
        correctAnswer: 1,
        explanation: 'Building psychological safety involves acknowledging that valuable thinkers process ideas differently; offering asynchronous and written channels empowers diverse participation.'
      }
    ]
  },
  {
    id: 'hr-policies-compliance',
    title: 'HR Policies and Compliance',
    category: 'HR Policies and Compliance',
    difficulty: 'Advanced',
    totalQuestions: 10,
    estimatedDuration: '10 mins',
    xpReward: 350,
    accentColor: 'cyan',
    badgeVariant: 'tag-cyan',
    description: 'Ensure compliance with equal employment opportunity regulations, workplace safety, anti-harassment laws, and employee rights.',
    questions: [
      {
        id: 1,
        question: 'Which of the following scenarios legally constitutes an unlawful hostile work environment under anti-harassment regulations?',
        options: [
          'A manager providing direct, critical feedback regarding an employee missed milestones',
          'Pervasive, severe, and unwelcome comments or conduct based on a protected characteristic that interferes with work performance',
          'An isolated polite disagreement between two coworkers over font selections in marketing slides',
          'A mandatory department requirement to complete annual compliance certifications'
        ],
        correctAnswer: 1,
        explanation: 'Unlawful harassment occurs when unwelcome conduct based on protected characteristics (race, gender, religion, age, etc.) is severe or pervasive enough to create an abusive working environment.'
      },
      {
        id: 2,
        question: 'Under Equal Employment Opportunity (EEO) laws and Title VII, which of the following is legally categorized as a protected class?',
        options: [
          'Years of professional experience with specific software productivity suites',
          'Race, color, religion, sex (including pregnancy and gender identity), national origin, age (40+), and disability',
          'Preference for hybrid remote work schedules over five-day in-office attendance',
          'Personal hobbies, recreational activities, and sporting fandom affiliations'
        ],
        correctAnswer: 1,
        explanation: 'Federal EEO statutes protect individuals from employment discrimination based on race, color, religion, sex, national origin, age (40 and older), disability, and genetic information.'
      },
      {
        id: 3,
        question: 'An employee with an established physical disability requests speech-to-text software to carry out their primary duties. What does the Americans with Disabilities Act (ADA) require of the employer?',
        options: [
          'Terminate the employee immediately due to inability to perform unmodified duties',
          'Engage in an interactive dialogue to identify reasonable accommodations that do not impose an undue hardship on the organization',
          'Require the employee to pay for all necessary software licenses out of their personal salary',
          'Deny the request unless the employee forfeits their medical insurance coverage'
        ],
        correctAnswer: 1,
        explanation: 'The ADA mandates that employers participate in a cooperative interactive process to explore and provide reasonable accommodations that enable qualified individuals with disabilities to work.'
      },
      {
        id: 4,
        question: 'What primary statutory protection is granted to qualifying employees under the Family and Medical Leave Act (FMLA)?',
        options: [
          'Guaranteed promotion and automatic salary increase upon returning from leave',
          'Up to 12 weeks of job-protected, unpaid leave for qualifying family or medical circumstances with continued health insurance benefits',
          'Unlimited paid leave for personal travel regardless of organizational headcount',
          'Permanent exemption from company performance reviews for three consecutive years'
        ],
        correctAnswer: 1,
        explanation: 'FMLA entitles eligible employees of covered employers to take unpaid, job-protected leave for specified family and medical reasons, with continuation of group health insurance.'
      },
      {
        id: 5,
        question: 'What is the key regulatory distinction between "exempt" and "non-exempt" employees under the Fair Labor Standards Act (FLSA)?',
        options: [
          'Exempt employees do not have to adhere to standard company security protocols',
          'Non-exempt employees must be paid overtime compensation (1.5x regular pay rate) for hours worked beyond 40 in a workweek',
          'Exempt employees are barred by law from receiving paid medical insurance benefits',
          'Non-exempt employees are legally excluded from occupational safety and health protections'
        ],
        correctAnswer: 1,
        explanation: 'Under the FLSA, non-exempt workers are entitled to overtime pay for working over 40 hours per week, while exempt employees must meet specific salary and professional job duty criteria.'
      },
      {
        id: 6,
        question: 'An employee notices frayed high-voltage wiring trailing across a doorway in an office corridor. What is their immediate responsibility under OSHA guidelines?',
        options: [
          'Attempt to splice the high-voltage electrical cable using scissors and regular tape',
          'Report the hazardous condition immediately to Facilities and HR while cautioning peers away from the danger zone',
          'Wait until the quarterly safety survey is distributed to mention the exposed cable',
          'Conceal the hazardous wiring underneath a decorative rug and continue working'
        ],
        correctAnswer: 1,
        explanation: 'Occupational safety and health regulations require employees to promptly report recognized workplace hazards to facilities or safety officers to protect coworkers from physical harm.'
      },
      {
        id: 7,
        question: 'A manager needs to share an employee complete date of birth, home address, and Social Security Number. What data privacy protocol must be upheld?',
        options: [
          'Paste the plain text credentials into an open public team messaging channel for rapid access',
          'Never transmit Personally Identifiable Information (PII) without verified legal justification, HR authorization, and strict encryption',
          'Post the employee record on the public company notice board for verification',
          'Treat PII as public information that can be freely distributed to third-party marketing vendors'
        ],
        correctAnswer: 1,
        explanation: 'Personally Identifiable Information (PII) is legally protected. Unauthorized dissemination exposes organizations to severe penalties and subjects employees to identity theft risks.'
      },
      {
        id: 8,
        question: 'What is the fundamental philosophy and goal behind an HR progressive discipline framework?',
        options: [
          'To generate justification for immediate employee dismissal without constructive dialogue',
          'To give employees transparent feedback, coaching, and a structured opportunity to correct performance or conduct deficiencies',
          'To penalize employees publicly in team meetings to deter similar mistakes by peers',
          'To dock employee accrued vacation pay automatically whenever a target deadline is missed'
        ],
        correctAnswer: 1,
        explanation: 'Progressive discipline is designed to be corrective rather than punitive, providing employees clear expectations, feedback, and defined milestones to regain satisfactory standing.'
      },
      {
        id: 9,
        question: 'If an employee appears visibly impaired while operating heavy workplace machinery or high-risk laboratory equipment, what immediate procedure must be executed?',
        options: [
          'Allow them to complete their scheduled shift to prevent departmental productivity losses',
          'Safely remove them from high-risk duties immediately, follow established reasonable suspicion protocols, and alert HR leadership',
          'Provide them with energy drinks and isolate them in an unmonitored equipment closet',
          'Conduct an impromptu informal sobriety competition in front of colleagues'
        ],
        correctAnswer: 1,
        explanation: 'Preserving human life and workplace safety requires immediate removal from safety-sensitive activities, followed by formal, confidential reasonable suspicion protocols managed with HR.'
      },
      {
        id: 10,
        question: 'Upon concluding employment with an organization, what is an employee legal and policy obligation regarding company devices and proprietary records?',
        options: [
          'Employees are entitled to retain laptops and customer databases as severance compensation',
          'Return all company hardware, security badges, access tokens, and confidential records promptly in accordance with offboarding agreements',
          'Permanently wipe and destroy company laptops before returning them to prevent team members from accessing code history',
          'Export proprietary source repositories and internal strategy plans to a personal cloud drive for future freelance use'
        ],
        correctAnswer: 1,
        explanation: 'All computing hardware, proprietary datasets, intellectual property, and security keys remain the exclusive property of the company and must be surrendered upon offboarding.'
      }
    ]
  }
];

export function getQuizById(quizId) {
  return quizzes.find((q) => q.id === quizId) || null;
}
