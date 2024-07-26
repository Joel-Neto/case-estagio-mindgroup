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
  `nome` text NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`nome`, `tipo`, `id`) VALUES
('Serviços', 'despesa', '06773dd3-dec1-49c5-a711-736d4639c758'),
('Roupas e Acessórios', 'despesa', '0f5a8e5d-3b31-43ff-993c-793c50c69007'),
('Vendas', 'receita', '19eb5b6f-8f92-4cf0-9b71-97cd99f3d861'),
('Moradia', 'despesa', '29f7a22b-083a-4b5d-9fd2-4ce71c07ebfa'),
('Outros', 'receita', '2a9a268f-36d6-4e76-876f-518b738e135f'),
('Impostos', 'despesa', '3f00adb3-2ae6-43f3-9235-85fd3eb47fd5'),
('Doações', 'receita', '4ae8cb34-98ba-457b-9b53-1365dc78fa07'),
('Dívidas e Empréstimos', 'despesa', '62248440-597c-4c50-9a59-0e7c9ba4842f'),
('Alimentação', 'despesa', '65347504-ab8a-4b22-bef1-ea786a7f40c1'),
('Reembolsos', 'receita', '6b8a226f-a0e8-43ab-8ccf-72b0ff501ab5'),
('Bônus/Comissões', 'receita', '787007e9-cd7f-4aaf-a284-ae8cbad81056'),
('Freelancer/Consultoria', 'receita', '86157098-87f3-466f-9866-9b0d34d7da21'),
('Lazer', 'despesa', 'b0fc5089-97d7-4015-9b09-8500a443fd96'),
('Outros', 'despesa', 'bbfef8eb-91a3-48ae-90f7-8ae29cd02d7b'),
('Educação', 'despesa', 'bee738f4-e172-4f02-8124-06f430ede782'),
('Rendimentos de Investimentos', 'receita', 'c08f6ade-d030-4cb8-a2d8-69970fba0063'),
('Saúde', 'despesa', 'e0492eab-840e-4073-8ed4-7976bc738bb0'),
('Prêmios', 'receita', 'e1c096ad-0978-47e1-b6a5-996de130afc6'),
('Transporte', 'despesa', 'ec14e80f-8785-4298-b21c-be2e9c0b1a44'),
('Aluguéis', 'receita', 'ed664929-11ed-462c-9cc9-193598e8188a'),
('Salário', 'receita', 'f4dd34a1-7c16-4dad-93ce-67f70b0aa9c6');

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
(4, 1721680411616, 'Default1721680411616'),
(5, 1721934714491, 'Default1721934714491'),
(6, 1721935221539, 'Default1721935221539'),
(7, 1721942587606, 'Default1721942587606');

-- --------------------------------------------------------

--
-- Estrutura para tabela `transactions`
--

CREATE TABLE `transactions` (
  `description` text DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `categoryId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `transactions`
--

INSERT INTO `transactions` (`description`, `amount`, `type`, `date`, `id`, `userId`, `categoryId`) VALUES
('Jantar', 200.00, 'despesa', '2024-07-19', '2cdd1242-0459-4ce0-8a09-63f4fba0cd5f', 'e7233961-32d0-463a-b580-04935c0f04fe', '65347504-ab8a-4b22-bef1-ea786a7f40c1'),
('Shopping', 120.00, 'despesa', '2024-07-12', '433582c6-450a-445f-bf6c-e7a3c04bf2ac', 'e7233961-32d0-463a-b580-04935c0f04fe', '0f5a8e5d-3b31-43ff-993c-793c50c69007'),
('Salário', 600.00, 'receita', '2024-07-05', '6fbb9b67-aedf-4fc2-afc3-310fba2009aa', 'e7233961-32d0-463a-b580-04935c0f04fe', 'f4dd34a1-7c16-4dad-93ce-67f70b0aa9c6'),
('Salário', 400.00, 'receita', '2024-07-20', 'da4e876e-8320-434d-8f4b-86e8845e509a', 'e7233961-32d0-463a-b580-04935c0f04fe', 'f4dd34a1-7c16-4dad-93ce-67f70b0aa9c6');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `img` text DEFAULT NULL,
  `id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`name`, `email`, `password`, `img`, `id`) VALUES
('Joel', 'joel@email.com', '$2b$10$uoX63ncqnKx1I0ZwhTAR/uizzEjljX2QTVv9ndyHfTnW/1XV9Q3RG', '1722034481752_homem.png', 'e7233961-32d0-463a-b580-04935c0f04fe');

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
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
