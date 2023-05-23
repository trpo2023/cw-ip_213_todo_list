-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 15 2023 г., 19:35
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `app`
--
CREATE DATABASE app;
USE app;

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `text` text,
  `date` date NOT NULL,
  `done` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `text`, `date`, `done`) VALUES
(1, 'sdsdfsf', '2023-05-14', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`login`, `password`, `id`) VALUES
('asdge', 'd41d8cd98f00b204e9800998ecf8427e', 37),
('awsdge', 'd41d8cd98f00b204e9800998ecf8427e', 38),
('123456', 'e10adc3949ba59abbe56e057f20f883e', 39),
('12332554', 'e10adc3949ba59abbe56e057f20f883e', 40),
('wdawdaw', 'e10adc3949ba59abbe56e057f20f883e', 41),
('123456345345', 'e10adc3949ba59abbe56e057f20f883e', 42),
('123456345345435', 'e10adc3949ba59abbe56e057f20f883e', 43),
('zxcvbn', 'e10adc3949ba59abbe56e057f20f883e', 44),
('asdasdasd', 'e10adc3949ba59abbe56e057f20f883e', 45),
('wesdfbgsjfhsf', 'e10adc3949ba59abbe56e057f20f883e', 46),
('1232515', 'e10adc3949ba59abbe56e057f20f883e', 47),
('ikjipkm', 'e10adc3949ba59abbe56e057f20f883e', 48);

-- --------------------------------------------------------

--
-- Структура таблицы `user_task`
--

CREATE TABLE `user_task` (
  `id_user` int NOT NULL,
  `id_task` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `user_task`
--

INSERT INTO `user_task` (`id_user`, `id_task`) VALUES
(37, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_task`
--
ALTER TABLE `user_task`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_task` (`id_task`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `user_task`
--
ALTER TABLE `user_task`
  ADD CONSTRAINT `user_task_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_task_ibfk_2` FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;