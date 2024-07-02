DROP DATABASE IF EXISTS Eduwise;
CREATE DATABASE Eduwise;
USE Eduwise;

-- Add data Account
INSERT INTO Eduwise.`Account`(Email							, Username			, full_name		,  create_date  ,	`password`														,`Role`		,	phone	,ADDRESS							)			
VALUES 				('Email1@gmail.com'				, 'Username1'		,'Fullname1'	, '2020-03-05' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi' 	, 'ADMIN'	,	01002210,'HN'								),			
					('Email2@gmail.com'				, 'Username2'		,'Fullname2'	, '2020-03-05' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'ADMIN'	,	01002220,'ND'								),			
                    ('Email3@gmail.com'				, 'Username3'		,'Fullname3'	, '2020-03-07' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'MANAGER'	,	01002230,'HP'								),			
                    ('Email4@gmail.com'				, 'Username4'		,'Fullname4'	, '2020-03-08' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'MANAGER'	,	01002240,'HD'								),			
                    ('Email5@gmail.com'				, 'Username5'		,'Fullname5'	, '2020-03-10' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'MANAGER'	,	01002250,'HG'								),			
                    ('Email6@gmail.com'				, 'Username6'		,'Fullname6'	, '2020-04-05' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'USER'	,	01002260,'HR'								),			
                    ('Email7@gmail.com'				, 'Username7'		,'Fullname7'	, '2020-04-05' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'USER'	,	01002270,'HK'								),			
                    ('Email8@gmail.com'				, 'Username8'		,'Fullname8'	, '2020-04-07' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'USER'	,	01002280,'HL'								),			
                    ('Email9@gmail.com'				, 'Username9'		,'Fullname9'	, '2020-04-07' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'USER'	,	01002290,'HQ'								),			
                    ('Email10@gmail.com'			, 'Username10'		,'Fullname10'	, '2020-04-09' ,	'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi'	, 'USER'	,	01002200,'HC'								);
                    
INSERT INTO `Eduwise`.`teacher`   (`address`	, `email`				, `name`		, `nick_name`			, `phone`		)
VALUES 								('ENGLISH'  , 'Jennica@gmail.com'   , 'Jennica'		, 'Jennica'				, '011200011'   ),
									('VietNam'  , 'quoccuong@gmail.com' , 'Quốc Cường'	, 'quoc cuong'			, '011200021'   ),
									('VietNam'  , 'huukhoa@gmail.com'  	, 'Hữu Khoa'	, 'huu khoa'			, '011200031'   ),
									('VietNam'  , 'nhatle@gmail.com'  	, 'Nhật Lê'		, 'nhat le'				, '011200041'   ),
									('VietNam'  , 'nam@gmail.com' 	    , 'Nguyễn Nam'	, 'van nam'				, '011200051'   ),
									('VietNam'  , 'huy@gmail.com'  		, 'Nguyễn Huy'	, 'huy nguyen'			, '011200061'   );


                    
INSERT INTO `Eduwise`.`course` 	( `course_description`   	, `name`		    , `course_type`, `image`                                    , `lession_number`, `price`    , `status` , `student_number` , `teacher_id`  )
VALUES 							 	( 'Tiếng Anh 400'		   	, 'Tiếng Anh 400'    , 'ENGLIGH'    , 'images/courses/ENGLISH/400.png'      	, '40'            , '5000000'  , 'NEW'    , '30'             ,          '1'  ),
									( 'Tiếng Anh 450'		   	, 'Tiếng Anh 450'    , 'ENGLIGH'    , 'images/courses/ENGLISH/450.png'      	, '40'            , '5000000'  , 'NEW'    , '30'             ,          '1'  ),
									( 'Tiếng Anh 500'		   	, 'Tiếng Anh 500'    , 'ENGLIGH'    , 'images/courses/ENGLISH/500.png'      	, '40'            , '5000000'  , 'NEW'    , '30'             ,          '1'  ),
									( 'Tiếng Anh 550'		   	, 'Tiếng Anh 550'    , 'ENGLIGH'    , 'images/courses/ENGLISH/550.png'      	, '40'            , '5000000'  , 'NEW'    , '30'             ,          '1'  ),
									( 'Tiếng Anh 600'		   	, 'Tiếng Anh 600'    , 'ENGLIGH'    , 'images/courses/ENGLISH/600.png'      	, '40'            , '5000000'  , 'NEW'    , '30'             ,          '1'  ),
									( 'Đồ Họa 1'		   		, 'Đồ Họa 1'     	 , 'DOHOA'    	, 'images/courses/Đồ họa/1.png'      		, '40'            , '5000000'  , 'NEW'    , '30'             ,          '4'  ),
									( 'Đồ Họa 2'		   		, 'Đồ Họa 2'         , 'DOHOA'    	, 'images/courses/Đồ họa/2.png'      		, '40'            , '5000000'  , 'NEW'    , '30'             ,          '4'  ),
									( 'Đồ Họa 3'		   		, 'Đồ Họa 3'         , 'DOHOA'    	, 'images/courses/Đồ họa/3.png'      		, '40'            , '5000000'  , 'NEW'    , '30'             ,          '4'  ),
									( 'Đại số 1'		   		, 'Đại số 1'     	 , 'DAISO'      , 'images/courses/Đại số/Đại số 1.png'      , '40'            , '5000000'  , 'NEW'    , '30'             ,          '5'  ),
									( 'Đại số 2'		   		, 'Đại số 2'     	 , 'DAISO'    	, 'images/courses/Đại số/Đại số 2.png'      , '40'            , '5000000'  , 'NEW'    , '30'             ,          '5'  ),
									( 'Đại số 3'		   		, 'Đại số 3'     	 , 'DAISO'    	, 'images/courses/Đại số/Đại số 3.png'      , '40'            , '5000000'  , 'NEW'    , '30'             ,          '5'  ),
									( 'Giải Tích 1'		   		, 'Giải Tích 1'     , 'GIAITICH'    , 'images/courses/Giải tích/Giải tích 1.png', '40'            , '5000000'  , 'NEW'    , '30'             ,          '6'  ),
									( 'Giải Tích 2'		   		, 'Giải Tích 2'     , 'GIAITICH'    , 'images/courses/Giải tích/Giải tích 2.png', '40'            , '5000000'  , 'NEW'    , '30'             ,          '6'  ),
									( 'Giải Tích 3'		   		, 'Giải Tích 3'     , 'GIAITICH'    , 'images/courses/Giải tích/Giải tích 3.png', '40'            , '5000000'  , 'NEW'    , '30'             ,          '6'  ),
									( 'java'		   			, 'java'     		, 'LAPTRINH'    , 'images/courses/LẬP TRÌNH/java.png'       , '40'            , '5000000'  , 'NEW'    , '30'             ,          '2'  ),
									( 'javascirpt'		   		, 'javascirpt'      , 'LAPTRINH'    , 'images/courses/LẬP TRÌNH/js.png'         , '40'            , '5000000'  , 'NEW'    , '30'             ,          '2'  ),
									( 'mysql'		   			, 'mysql'     		, 'LAPTRINH'    , 'images/courses/LẬP TRÌNH/mysql.png'      , '40'            , '5000000'  , 'NEW'    , '30'             ,          '2'  ),
									( 'php'		   				, 'php'     		, 'LAPTRINH'    , 'images/courses/LẬP TRÌNH/PHP.png'        , '40'            , '5000000'  , 'NEW'    , '30'             ,          '2'  ),
									( 'python'		   			, 'python'     		, 'LAPTRINH'    , 'images/courses/LẬP TRÌNH/python.png'     , '40'            , '5000000'  , 'NEW'    , '30'             ,          '2'  ),
                                    ( 'kỹ năng mềm 1'		   	, 'kỹ năng mềm 1'   , 'SOFT_SKILL'    , 'images/courses/kỹ năng mềm/3.png'		, '40'            , '5000000'  , 'NEW'    , '30'             ,          '3'  ),
									( 'kỹ năng mềm 2'		   	, 'kỹ năng mềm 2'   , 'SOFT_SKILL'    , 'images/courses/kỹ năng mềm/4.png'		, '40'            , '5000000'  , 'NEW'    , '30'             ,          '3'  ),
									( 'kỹ năng mềm 3'			, 'kỹ năng mềm 3'   , 'SOFT_SKILL'    , 'images/courses/kỹ năng mềm/5.png'		, '40'            , '5000000'  , 'NEW'    , '30'             ,          '3'  );
 
INSERT INTO `Eduwise`.`videocourse` (`pathvideo`, 																			   `course_id`			, title		)
VALUES 								('<iframe width="560" height="315" src="https://www.youtube.com/embed/d089EGEqqJQ?si=zDQl9quRqh2KjqDQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', 	15			,	"java buổi 1"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/zDiYytK15ek?si=f8yc0TlK5c67TdFb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'  ,	15			,	"java buổi 2"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/RRIt1_MiwLQ?si=BnXDH1jnetPbT3hu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'  ,	15			,	"java buổi 3"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/1te4dycxiWQ?si=75Upp4D8Hbn3jJ1x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' ,   15			,	"java buổi 4"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/0M8judeF-r0?si=DEEm9TgKvjBCh71q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' ,   15			,	"java buổi 5"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/0thGLsXt95k?si=YnrrL1w57-x_p91n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' ,   15			,	"java buổi 6"	),
                                    ('<iframe width="560" height="315" src="https://www.youtube.com/embed/-jV06pqjUUc?si=FOq7yTzA5KHsnB3b" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', 	16			,	"java buổi 1"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/efI98nT8Ffo?si=7NFyw82nU-Fvj6mM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'  ,	16			,	"java buổi 2"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/W0vEUmyvthQ?si=lX_Hgv7RcoeIdCcz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'  ,	16			,	"java buổi 3"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/CLbx37dqYEI?si=5vIxoRuFA9ockgut" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' ,   16			,	"java buổi 4"	),
									('<iframe width="560" height="315" src="https://www.youtube.com/embed/xRpXBEq6TOY?si=ieOHQYrAXSWBBZVX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' ,   16			,	"java buổi 5"	);                                  