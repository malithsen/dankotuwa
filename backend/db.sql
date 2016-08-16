CREATE TABLE `sales_representative` (
  `EmployeeID` bigint(30) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(30) DEFAULT NULL,
  `UserName` VARCHAR(30) DEFAULT NULL,
  `Email` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`)
);

CREATE TABLE `product` (
  `ProductID` bigint(30) NOT NULL AUTO_INCREMENT,
  `ProductName` VARCHAR(30) DEFAULT NULL,
  `Price` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`ProductID`)
);

CREATE TABLE `category` (
  `CategoryID` bigint(30) NOT NULL AUTO_INCREMENT,
  `CategoryName` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
);

CREATE TABLE `order_info` (
  `OrderNumber` bigint(30) NOT NULL AUTO_INCREMENT,
  `Epoch` bigint(10) DEFAULT NULL,
  PRIMARY KEY (`OrderNumber`)
);

CREATE TABLE `order_product` (
  `OrderNumber` bigint(30) NOT NULL,
  `ProductID` bigint(30) NOT NULL,
  `CategoryID` bigint(30) NOT NULL,
  PRIMARY KEY (`OrderNumber`, `ProductID`),
  CONSTRAINT `fk_product` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `dealer` (
  `DealerID` bigint(30) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(30) DEFAULT NULL,
  `Geo_lat` VARCHAR(9) DEFAULT NULL,
  `Geo_lng` VARCHAR(9) DEFAULT NULL,
  PRIMARY KEY (`DealerID`)
);

CREATE TABLE `dealer_rep_order` (
  `EmployeeID` bigint(30) NOT NULL,
  `OrderNumber` bigint(30) NOT NULL,
  `DealerID` bigint(30) NOT NULL,
  `Correct_location` int(1) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`,`OrderNumber`,`DealerID`),
  CONSTRAINT `fk_emp` FOREIGN KEY (`EmployeeID`) REFERENCES `sales_representative` (`EmployeeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_oID` FOREIGN KEY (`OrderNumber`) REFERENCES `order_info` (`OrderNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_dealer` FOREIGN KEY (`DealerID`) REFERENCES `dealer` (`DealerID`) ON DELETE CASCADE ON UPDATE CASCADE
);
