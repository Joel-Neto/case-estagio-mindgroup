-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_case_mindgroup1`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nome` text NOT NULL,
  `tipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `nome`, `tipo`) VALUES
(1, 'Alimentação', 'despesa'),
(2, 'Moradia', 'despesa'),
(3, 'Transporte', 'despesa'),
(4, 'Saúde', 'despesa'),
(5, 'Educação', 'despesa'),
(6, 'Lazer', 'despesa'),
(7, 'Roupas e Acessórios', 'despesa'),
(8, 'Impostos', 'despesa'),
(9, 'Serviços', 'despesa'),
(10, 'Dívidas e Empréstimos', 'despesa'),
(11, 'Outros', 'despesa'),
(12, 'Salário', 'receita'),
(13, 'Rendimentos de Investimentos', 'receita'),
(14, 'Vendas', 'receita'),
(15, 'Aluguéis', 'receita'),
(16, 'Freelancer/Consultoria', 'receita'),
(17, 'Bônus/Comissões', 'receita'),
(18, 'Doações', 'receita'),
(19, 'Reembolsos', 'receita'),
(20, 'Prêmios', 'receita'),
(21, 'Outros', 'receita');

-- --------------------------------------------------------

--
-- Estrutura para tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1721679896442, 'Default1721679896442'),
(2, 1721680058481, 'Default1721680058481'),
(3, 1721680130064, 'Default1721680130064'),
(4, 1721680411616, 'Default1721680411616');

-- --------------------------------------------------------

--
-- Estrutura para tabela `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `transactions`
--

INSERT INTO `transactions` (`id`, `description`, `amount`, `type`, `date`, `userId`, `categoryId`) VALUES
(3, 'Salário', 1000.00, 'receita', '2024-08-05', 3, 12),
(5, 'Viagem', 830.00, 'despesa', '2024-08-03', 3, 6),
(6, 'Shopping com a Família', 600.00, 'despesa', '2024-07-25', 3, 6),
(7, 'Bolsa monitoria', 307.00, 'receita', '2024-07-27', 3, 12);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(3, 'Joel de Farias Alves Neto', 'joelalves@email.com', '$2b$10$o4FT52Wf1TYywPDhWJCq3OrIoGHO4EajSEvcbxBnSpDTMMc/ncGa2'),
(4, 'João', 'joao@email.com', '$2b$10$42Ubr90nFO4xlyqLgiBRhOp4TpAwi.wOwF4x6mZ6PbV7bTQTi7pK2'),
(6, 'John Doe', 'john@email.com', '$2b$10$xAMmVqS7jVyuAddteM7StuisxJ8HokiIUs5.KIXWrS4pkF5mliBq6');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6bb58f2b6e30cb51a6504599f41` (`userId`),
  ADD KEY `FK_86e965e74f9cc66149cf6c90f64` (`categoryId`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`) USING HASH;

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `FK_6bb58f2b6e30cb51a6504599f41` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_86e965e74f9cc66149cf6c90f64` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
