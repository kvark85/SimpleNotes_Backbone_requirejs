-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Июл 12 2016 г., 22:02
-- Версия сервера: 10.1.13-MariaDB
-- Версия PHP: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `l63832sl_kvark85`
--

-- --------------------------------------------------------

--
-- Структура таблицы `sn_todo`
--

CREATE TABLE `sn_todo` (
  `todo_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(1024) DEFAULT NULL,
  `completed` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sn_todo`
--

INSERT INTO `sn_todo` (`todo_id`, `user_id`, `title`, `completed`) VALUES
(1, 77, 'раз', 1),
(3, 79, 'vk раз', 1),
(4, 79, 'vk два', 0),
(6, 77, '2,5', 0),
(8, 77, '3', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `sn_user`
--

CREATE TABLE `sn_user` (
  `user_id` int(11) NOT NULL,
  `login` varchar(32) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `new_email` varchar(32) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `regNum` varchar(10) DEFAULT NULL,
  `emailNum` int(10) DEFAULT NULL,
  `restorePassNum` int(11) DEFAULT NULL,
  `vk_user_id` varchar(10) DEFAULT NULL,
  `photo_rec` varchar(60) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `last_visit_date` date DEFAULT NULL,
  `counter_visit` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `sn_user`
--

INSERT INTO `sn_user` (`user_id`, `login`, `name`, `email`, `new_email`, `password`, `regNum`, `emailNum`, `restorePassNum`, `vk_user_id`, `photo_rec`, `registration_date`, `last_visit_date`, `counter_visit`) VALUES
(77, 'www', 'Андрей - можно пробовать менят', 'kvark85@yandex.ru', '', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '', 0, 198113579, NULL, NULL, '2016-05-29', '2016-07-12', 41),
(79, NULL, 'Андрей', NULL, NULL, NULL, '', NULL, NULL, '402276', 'http://cs629201.vk.me/v629201276/60/9BI1d9dunXM.jpg', '2016-05-29', '2016-07-12', 11);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `sn_todo`
--
ALTER TABLE `sn_todo`
  ADD PRIMARY KEY (`todo_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `sn_user`
--
ALTER TABLE `sn_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `sn_todo`
--
ALTER TABLE `sn_todo`
  MODIFY `todo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблицы `sn_user`
--
ALTER TABLE `sn_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `sn_todo`
--
ALTER TABLE `sn_todo`
  ADD CONSTRAINT `sn_todo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sn_user` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
