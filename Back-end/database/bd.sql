create database recicla_recife;
-- drop database recicla_recife;
use recicla_recife;

create table Organizacoes(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cnpj VARCHAR(18),
	nome_fantasia varchar(100),
    email VARCHAR(100),
    password VARCHAR(100),
    porte VARCHAR(20),
    telefone VARCHAR(11),
    localizacao_organizacao TEXT,
    responsavel_organizacao VARCHAR(60)
);


create table Eventos(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome_evento VARCHAR(100),
    localizacao_evento TEXT,
    descricao_evento TEXT,
    data_evento DATE , 
    organizacao_id INT ,
    FOREIGN KEY (organizacao_id) REFERENCES Organizacoes(ID) ON DELETE CASCADE
);

create table Estrategias(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	titulo_estrategia VARCHAR(50),
    tipo_estrategia VARCHAR(50),
    descricao_estrategia TEXT,
    organizacao_id int ,
    FOREIGN KEY (organizacao_id) REFERENCES Organizacoes(ID) ON DELETE CASCADE
);



create table Est_evt(
	id_evento INT, 
    id_Estrategia INT,
    PRIMARY KEY (id_evento,id_estrategia),
    FOREIGN KEY(id_evento) REFERENCES Eventos(ID) ON DELETE CASCADE,
    FOREIGN KEY (id_estrategia) REFERENCES Estrategias(ID) ON DELETE CASCADE
);

-- INSERTS

-- SELECTS

SELECT * FROM Organizacoes;
SELECT * FROM Eventos;
SELECT * FROM Estrategias;


Delete FROM estrategias WHERE ID = 1;
SELECT * FROM Est_evt;