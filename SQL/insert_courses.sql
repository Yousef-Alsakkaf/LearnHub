-- Populate the courses table
INSERT INTO `courses` (`Name`, `course_code`, `academic_year`) VALUES
('Introduction to Computer Science', 'CSCI101', 2024),
('Engineering Mechanics', 'ENGR201', 2024),
('Principles of Marketing', 'BUSN301', 2024),
('Psychology 101', 'PSYC101', 2024);

-- Populate the teaches table (assigning instructors to courses)
INSERT INTO `teaches` (`course_id`, `instructor_id`) VALUES
(1, 5), -- Tariq Sabbagh teaching Introduction to Computer Science
(2, 6), -- Kenan Loay teaching Engineering Mechanics
(3, 6), -- Kenan Loay teaching Principles of Marketing
(4, 5); -- Tariq Sabbagh teaching Psychology 101

-- Populate the studies table (enrollment of students in courses)
INSERT INTO `studies` (`course_id`, `student_id`, `final_grade`, `attendance`) VALUES
(1, 1, NULL, NULL), -- Wafiq Akram enrolled in Introduction to Computer Science
(1, 2, NULL, NULL), -- MHD Yaman enrolled in Introduction to Computer Science
(1, 3, NULL, NULL), -- Abdulrahamn Al Ali enrolled in Introduction to Computer Science
(2, 1, NULL, NULL), -- Wafiq Akram enrolled in Engineering Mechanics
(2, 3, NULL, NULL), -- Abdulrahamn Al Ali enrolled in Engineering Mechanics
(3, 9, NULL, NULL), -- Faisal Sahloul enrolled in Principles of Marketing
(4, 4, NULL, NULL), -- Yousef Sakkaf enrolled in Psychology 101
(4, 10, NULL, NULL); -- Mohammad Dawood enrolled in Psychology 101
