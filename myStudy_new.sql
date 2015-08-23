-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 5.6.14 - MySQL Community Server (GPL)
-- OS Server:                    Win32
-- HeidiSQL Versi:               8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for mystudy
CREATE DATABASE IF NOT EXISTS `mystudy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mystudy`;


-- Dumping structure for procedure mystudy.addCourse
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `addCourse`(IN `name` VARCHAR(50), IN `description` VARCHAR(50), IN `alias` VARCHAR(50), IN `start` DATETIME, IN `end` DATETIME, IN `color` VARCHAR(50), IN `teacherId` VARCHAR(50))
BEGIN
	INSERT INTO COURSE(name,description,alias,start,end,color) VALUES(name,description,alias,start,end,color);
	INSERT INTO TEACHERCOURSE VALUES(TEACHERID,(SELECT IDCOURSE FROM COURSE ORDER BY IDCOURSE DESC LIMIT 1));
END//
DELIMITER ;


-- Dumping structure for procedure mystudy.addEvent
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `addEvent`(IN `idCourse` VARCHAR(50), IN `name` VARCHAR(50), IN `description` VARCHAR(50), IN `type` VARCHAR(50), IN `time` DATETIME, IN `config` VARCHAR(100))
BEGIN
	INSERT INTO EVENT(NAME,DESCRIPTION,TYPE,TIME,CONFIG,COURSE_IDCOURSE) VALUES(name,description,type,time,config,idCOurse);
END//
DELIMITER ;


-- Dumping structure for procedure mystudy.auth
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `auth`(IN `user` VARCHAR(50), IN `pass` VARCHAR(50))
BEGIN
	SELECT * FROM TEACHER WHERE SHA1(CONCAT(TEACHER.IDTEACHER,TEACHER.PASS)) = SHA1(CONCAT(user,pass)); 
END//
DELIMITER ;


-- Dumping structure for table mystudy.course
CREATE TABLE IF NOT EXISTS `course` (
  `idcourse` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(95) DEFAULT NULL,
  `alias` varchar(45) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcourse`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table mystudy.course: ~3 rows (approximately)
DELETE FROM `course`;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`idcourse`, `name`, `description`, `alias`, `start`, `end`, `color`) VALUES
	(1, 'Matematika Informatika', 'kuliah matematika informatika semester ganjil', 'matfor A', '2015-08-23 19:35:37', '2015-08-23 00:00:00', '#6BB9F0'),
	(2, 'Sistem Terdistribusi', 'praktikum Sister Terdistribusi', 'sister A', '2015-08-23 19:38:28', '2015-12-26 00:00:00', '#F5AB35'),
	(3, 'Basis Data A', 'praktikum basis data kelas A', 'basdat A', '2015-08-23 19:52:44', '2015-08-23 00:00:00', '#EF4836');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;


-- Dumping structure for table mystudy.event
CREATE TABLE IF NOT EXISTS `event` (
  `idevent` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `config` varchar(100) DEFAULT NULL,
  `course_idcourse` int(11) NOT NULL,
  PRIMARY KEY (`idevent`,`course_idcourse`),
  KEY `fk_event_course1_idx` (`course_idcourse`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table mystudy.event: ~3 rows (approximately)
DELETE FROM `event`;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` (`idevent`, `name`, `description`, `type`, `time`, `config`, `course_idcourse`) VALUES
	(1, 'pertemuan 1', 'kuliah kali ini membahas dasar-dasar matemati', 'presence', '2015-08-24 07:30:00', '{"presenceTime":"07:30","point":"1","allowLate":"no"}', 1),
	(2, 'praktikum 1', 'absensi praktikum 1', 'presence', '2015-08-23 19:52:00', '', 2),
	(3, 'praktikum modul 1', 'praktikum modul pertama basis data', 'presence', '2015-08-23 19:53:00', '', 3);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;


-- Dumping structure for table mystudy.eventrespon
CREATE TABLE IF NOT EXISTS `eventrespon` (
  `eventRespon_student_nrp` varchar(25) NOT NULL,
  `eventRespon_course_idcourse` int(11) NOT NULL,
  `event_idevent` int(11) NOT NULL,
  `responseData` varchar(100) DEFAULT NULL,
  `additionalData` longtext,
  PRIMARY KEY (`eventRespon_student_nrp`,`eventRespon_course_idcourse`,`event_idevent`),
  KEY `fk_studentCourse_has_event_event1_idx` (`event_idevent`),
  KEY `fk_studentCourse_has_event_studentCourse1_idx` (`eventRespon_student_nrp`,`eventRespon_course_idcourse`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mystudy.eventrespon: ~0 rows (approximately)
DELETE FROM `eventrespon`;
/*!40000 ALTER TABLE `eventrespon` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventrespon` ENABLE KEYS */;


-- Dumping structure for procedure mystudy.findTeacherCourse
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `findTeacherCourse`(IN `TEACHERID` VARCHAR(50))
BEGIN
	SELECT TEACHERCOURSE.TEACHER_IDTEACHER AS IDTEACHER,TEACHERCOURSE.COURSE_IDCOURSE AS IDCOURSE,NAME,DESCRIPTION,START,END,COLOR,ALIAS FROM TEACHERCOURSE JOIN COURSE ON TEACHERCOURSE.COURSE_IDCOURSE=COURSE.IDCOURSE WHERE TEACHERCOURSE.TEACHER_IDTEACHER = TEACHERID;
END//
DELIMITER ;


-- Dumping structure for procedure mystudy.getActiveCourse
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getActiveCourse`(IN `idCourse` VARCHAR(50))
BEGIN
	SELECT course.idcourse,course.name,course.color,course.description,course.alias, DATE_FORMAT(start, '%d/%m/%Y') start,DATE_FORMAT(end, '%d/%m/%Y') end FROM COURSE WHERE COURSE.IDCOURSE = idCourse;
END//
DELIMITER ;


-- Dumping structure for procedure mystudy.getEvent
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getEvent`(IN `idCourse` VARCHAR(50))
BEGIN
	SELECT color,idcourse,event.name,idevent,event.description,type,DATE_FORMAT(time, '%d/%m/%y') date,DATE_FORMAT(time, '%d/%m/%y %H:%i') datetime,DATE_FORMAT(time, '%H:%i') time,config FROM  COURSE JOIN EVENT ON COURSE.IDCOURSE=EVENT.COURSE_IDCOURSE WHERE COURSE.IDCOURSE = idCourse;
END//
DELIMITER ;


-- Dumping structure for table mystudy.student
CREATE TABLE IF NOT EXISTS `student` (
  `nrp` varchar(25) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `angkatan` varchar(45) DEFAULT NULL,
  `data` varchar(1000) DEFAULT NULL,
  `picture` mediumtext,
  `pass` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nrp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mystudy.student: ~0 rows (approximately)
DELETE FROM `student`;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;


-- Dumping structure for table mystudy.studentcourse
CREATE TABLE IF NOT EXISTS `studentcourse` (
  `student_nrp` varchar(25) NOT NULL,
  `course_idcourse` int(11) NOT NULL,
  PRIMARY KEY (`student_nrp`,`course_idcourse`),
  KEY `fk_student_has_course_course1_idx` (`course_idcourse`),
  KEY `fk_student_has_course_student_idx` (`student_nrp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mystudy.studentcourse: ~0 rows (approximately)
DELETE FROM `studentcourse`;
/*!40000 ALTER TABLE `studentcourse` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentcourse` ENABLE KEYS */;


-- Dumping structure for table mystudy.teacher
CREATE TABLE IF NOT EXISTS `teacher` (
  `idteacher` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `pass` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idteacher`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mystudy.teacher: ~1 rows (approximately)
DELETE FROM `teacher`;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` (`idteacher`, `name`, `pass`) VALUES
	('5112100083', 'thiar', 'anginbiru');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;


-- Dumping structure for table mystudy.teachercourse
CREATE TABLE IF NOT EXISTS `teachercourse` (
  `teacher_idteacher` varchar(45) NOT NULL,
  `course_idcourse` int(11) NOT NULL,
  PRIMARY KEY (`teacher_idteacher`,`course_idcourse`),
  KEY `fk_teacher_has_course_course1_idx` (`course_idcourse`),
  KEY `fk_teacher_has_course_teacher1_idx` (`teacher_idteacher`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mystudy.teachercourse: ~3 rows (approximately)
DELETE FROM `teachercourse`;
/*!40000 ALTER TABLE `teachercourse` DISABLE KEYS */;
INSERT INTO `teachercourse` (`teacher_idteacher`, `course_idcourse`) VALUES
	('5112100083', 1),
	('5112100083', 2),
	('5112100083', 3);
/*!40000 ALTER TABLE `teachercourse` ENABLE KEYS */;


-- Dumping structure for procedure mystudy.updateEvent
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateEvent`(IN `name` VARCHAR(50), IN `description` VARCHAR(50), IN `config` VARCHAR(100), IN `timeEvent` DATETIME, IN `idEvent` INT)
BEGIN
	UPDATE EVENT SET NAME = name,DESCRIPTION=description,CONFIG=config,time=timeEvent WHERE event.idevent = idEvent;
END//
DELIMITER ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
