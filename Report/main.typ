#set page(paper: "a4")
#set text(size: 12pt)
#show heading:set align(center)
#let leading = 1.5em
#let leading = leading - 0.75em 
#set block(spacing: leading)
#set par(leading: leading)
#set document(title: [AI-Powered Phishing Email Detection System],author:"Mr. Rueben van der Westhuizen")


#align(center)[
  #set text(size: 20pt)
  *AI-Powered Phishing Email Detection System*
  
  #set text(size: 16pt)
  *Mr. Rueben van der Westhuizen*
  
  #set text(size: 14pt)
  u21434809
]




#pagebreak()
#outline()
#pagebreak()

#set page(numbering: "1")
#counter(page).update(1)


== 1. Introduction (Research Overview) - [1 Page]
=== 1.1 How does AI detect Phishing attacks:

=== 1.2 Traditional methods

=== 1 .3 Advantages 

  #linebreak() 
#pagebreak()
== 2. Dataset Preparation
2.1 Selection of Kaggle's Phishing Email Dataset #linebreak()  
2.2 Data Preprocessing & Feature Extraction #linebreak()  
  - Subject Lines  
  - Sender Information  
  - Email Content  

== 4. Model Development
4.1 Machine Learning Models Considered #linebreak()  
  - Logistic Regression  
  - Random Forest  
  - Neural Networks  
4.2 Model Selection Justification #linebreak()  
4.3 Training and Evaluation Metrics  
  - Accuracy  
  - Precision  
  - Recall  
  - F1-score  

== 5. Prototype Implementation
5.1 Web-Based Interface Overview #linebreak()   
5.2 Functionalities and User Flow #linebreak()   
5.3 Confidence Score and Explainability Features  

== 6. AI Explainability
6.1 Explanation Mechanism #linebreak()   
6.2 Highlighting Suspicious Phrases and Metadata #linebreak()   

== 7. Testing and Evaluation
7.1 Real-World Phishing Email Testing #linebreak()   
7.2 Success and Failure Cases #linebreak()   
7.3 Limitations and Potential Improvements  

== 8. System Design
8.1 UML Diagrams  
  - System Architecture  
  - Workflow Design  
  - Class Diagram (if applicable)  
8.2 Implementation Considerations  

== 9. Conclusion and Future Work
9.1 Summary of Findings  
9.2 Potential Enhancements  

== 10. Bibliography
10.1 Literature References  
10.2 Dataset and Tools Used  

== 11. Appendices
11.1 Code Snippets  
11.2 Additional Test Results  
