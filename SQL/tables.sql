CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50),
  `password` varchar(50),
  `fName` varchar(50),
  `lName` varchar(50),
  `UID` varchar(8),
  `type` ENUM('student','instructor','admin'),
  `email` varchar(255),
  `active` BOOLEAN,
  `picture` VARCHAR(255)
);

CREATE TABLE access_tokens (
id INT,
token varchar(120),
FOREIGN KEY (`id`) REFERENCES `users` (`id`)
);

CREATE TABLE `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY ,
  `Name` varchar(50),
  `course_code` VARCHAR(10),
  `academic_year` YEAR
);

CREATE TABLE `studies` (
  `course_id` INT,
  `student_id` INT,
  `final_grade` FLOAT,
  `attendance` FLOAT,
  FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `teaches` (
  `course_id` INT,
  `instructor_id` INT,
  FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `material` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `course_id` INT,
  `weight` FLOAT,
  `title` varchar(50),
  `deadline` DATETIME,
  FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
);


CREATE TABLE `m_grade` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `course_id` INT,
  `material_id` INT,
  `student_id` INT,
  `grade` FLOAT,
  FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  FOREIGN KEY (`material_id`) REFERENCES `material` (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `majors` (
  `name` varchar(50),
   PRIMARY KEY  (`name`)
);

CREATE TABLE `requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(50),
  `major` varchar(50),
  `name` varchar(50),
  `letter` varchar(255),
  FOREIGN KEY (`major`) REFERENCES `majors` (`name`)
);

CREATE TABLE `Logs` (
  `logId` int,
  `event` varchar(20),
  `details` varchar(255),
  `initiator` int,
  `date` date,
  PRIMARY KEY (`logId`),
  FOREIGN KEY (`initiator`) REFERENCES `users`(`id`)
);
