-- Inserting data into 'users' table
INSERT INTO `users` (`id`, `username`, `password`, `type`, `email`, `active`) VALUES
(1, 'Wafiq', 'password', 'student', 'wafiq@example.com', 1),
(2, 'MHD', 'password', 'student', 'mhd@example.com', 1),
(3, 'Abdulrahamn', 'password', 'student', 'abdulrahamn@example.com', 1),
(4, 'Yousef', 'password', 'student', 'yousef@example.com', 1),
(5, 'Tariq', 'password', 'instructor', 'tariq@example.com', 1),
(6, 'Kenan', 'password', 'instructor', 'kenan@example.com', 1),
(7, 'Alfarouq', 'password', 'admin', 'alfarouq@example.com', 1),
(8, 'Khalid', 'password', 'admin', 'khalid@example.com', 1),
(9, 'Faisal', 'password', 'student', 'faisal@example.com', 1),
(10, 'Mohammad', 'password', 'student', 'mohammad@example.com', 1),
(11, 'Baraa', 'password', 'student', 'baraa@example.com', 1),
(12, 'Salim', 'password', 'student', 'salim@example.com', 1);

-- Inserting data into 'students' table
INSERT INTO `students` (`id`, `fName`, `lName`, `UID`) VALUES
(1, 'Wafiq', 'Akram', 'U2200234'),
(2, 'MHD', 'Yaman', 'U2200235'),
(3, 'Abdulrahamn', 'Al Ali', 'U2200236'),
(4, 'Yousef', 'Sakkaf', 'U2200237'),
(9, 'Faisal', 'Sahloul', 'U2200238'),
(10, 'Mohammad', 'Dawood', 'U2200239'),
(11, 'Baraa', 'Kabbani', 'U2200240'),
(12, 'Salim', 'Arnous', 'U2200241');

-- Inserting data into 'instructor' table
INSERT INTO `instructor` (`id`, `fName`, `lName`, `UID`) VALUES
(5, 'Tariq', 'Sabbagh', 'I2200100'),
(6, 'Kenan', 'Loay', 'I2200101');

-- Inserting data into 'admin' table
INSERT INTO `admin` (`id`, `fName`, `lName`) VALUES
(7, 'Alfarouq', 'Sharif'),
(8, 'Khalid', 'Daqqaq');
