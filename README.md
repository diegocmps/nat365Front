
![Logo](/assets/imagens/logo.png)


# Nature Finder

O Nature Finder é uma plataforma que permite explorar e contribuir para a preservação da natureza, fornecendo acesso a informações sobre áreas naturais, trilhas, parques ecológicos, reservas ambientais e outros locais de interesse para os amantes da natureza.

Através do Nature Finder é possível

* Cadastrar perfis de usuário;
* Cadastrar locais da natureza;
* Descrev dos locais da natureza;
* Registro dos locais em mapa, através de geolocalização, com busca por CEP;
* Visualizar e interagir com o minimapa.


# Demonstração

## Login/Senha

![App Screenshot](/assets/readme-images/login.png)

## Cadastro

![App Screenshot](/assets/readme-images/cadastro.jpeg)

## Dashboard

![App Screenshot](/assets/readme-images/dashboard.png)

## Imagem de Locais cadastrados

![App Screenshot](/assets/readme-images/localidades.jpeg)

## Cadastro de Locais

![App Screenshot](/assets/readme-images/CEP%20AUTOMÁTICO.gif)

![App Screenshot](/assets/readme-images/local.jpeg)

## Zoom no minimapa

![App Screenshot](/assets/readme-images/MINIMAPA.gif)


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/diegocmps/nat365Front.git
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npx json-server database.json
```

Inicie o projeto

```bash
    npm run dev
```

Ao iniciar o projeto, aparecerá no terminal um link para acesso à plataforma:

http://localhost:5173/

Também é possível acessar o projeto através do Vercel, através do link:

https://natureza365.vercel.app/

OBS: Como a plataforma depende do json-server em funcionamento, não é possível realizar os testes através do celular, podendo utilizar normalmente no computador, através de um navegador web.
## Modo Responsivo

É possível utilizar a plataforma Nature Finder através de celulares, pois a plataforma possui modo responsivo.

imagens

## Melhorias

Para futuras versões da plataforma, poderão ser aplicadas as seguintes melhorias:

      1. Integração com api de back-end;
      2. Inserção de galeria de imagens do local;
      3. Opção de compartilhamento de conteúdo em redes sociais;
      4. Registro de espécies de plantas e animais encontrados no local;
      5. Inclusão de guias e trilhas, fornecendo informações mais detalhadas sobre cada local;
      6. Lista de eventos e atividades realizadas nos locais;
      7. Notificações e alertas;
      8. Maior interação no mapa, apresentando os trajetos das trilhas.
 


## Stack utilizada

**Front-end:** 

Construção da plataforma através de HTML, Javascript e CSS utilizando as seguintes bibliotecas:


- [React](https://react.dev/) - para construção da interface do usuário.
- [Vite](https://vitejs.dev/guide/)
- [React Router DOM](https://reactrouter.com/en/main) - para navegação.
- [React Hook Form](https://react-hook-form.com/) - para gerenciamento de formulários.
- [React Leaflet](https://react-leaflet.js.org/) - para mapas interativos.
- [Axios](https://www.npmjs.com/package/axios) - para requisições HTTP.
- [JSON Server](https://www.npmjs.com/package/json-server) - para simulação de uma API REST.
- [ESLint](https://eslint.org/) - para garantir a qualidade do código.
- [Sass](https://sass-lang.com/) - para pré-processamento de CSS.



## Documentação de cores

| Hexadecimal                                                |
| ---------------------------------------------------------------- |
| ![#009879](https://via.placeholder.com/10/009879f?text=+) #009879 |
| ![#31cdad](https://via.placeholder.com/10/31cdad?text=+) #31cdad |
| ![#d00000](https://via.placeholder.com/10/d00000?text=+) #d00000 |
| ![#fbff17](https://via.placeholder.com/10/fbff17?text=+) #fbff17 |
| ![#0078a8](https://via.placeholder.com/10/0078a8?text=+) #0078a8 |
| ![#38f](https://via.placeholder.com/10/38f?text=+) #38f |


## Autores

- [@diegocmps](https://github.com/diegocmps)

  - Github: https://github.com/diegocmps
  - Linkedin: https://www.linkedin.com/in/diego-campos-8b97784b/



# Comentários e Agradecimentos

Este projeto foi realizado individualmente como trabalho de conclusão do Módulo 2 do Curso FuturoDEV Nature, do [Floripa Mais Tec](https://floripamaistec.pmf.sc.gov.br/).

O Floripa Mais Tec é um projeto realizado pelo [LAB365](https://lab365.tech/), uma extensão do SENAI/SC em parceria com a Prefeitura de Florianópolis.

Agradeço à toda a equipe do LAB365 pelo suporte durante a realização do curso, em especial aos professores deste módulo:

* [Nicholas Macedo](https://github.com/nicholasmacedoo)
* [Yan Esteves](https://github.com/yanesteves)


Agradeço também aos alunos das turmas FuturoDEV Nature e Trip, pela parceria durante esta jornada. 