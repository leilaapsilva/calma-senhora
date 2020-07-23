import React, { Component } from 'react'
import Modulo from '../../molecules/Modulo'
import TituloSecao from '../../atoms/TituloSecao'
import './styles.css'
import Artigo from '../../atoms/Artigo'
import Api from '../../../services/Api'


class ModulosSecao extends Component {
  constructor() {
    super()
    this.state = {
      modulos: [],
      materias: [],
      links: [],     
      display: false,
      identificacao: ""
    }
  }

  componentDidMount() {    
    this.carregaModulos();  
  }

  carregaModulos = async () => {
    const response = await Api.get(`/modulos`);
    this.setState({ modulos: response.data });
  };

  onClick = async (materias, id) => {    
    await this.setState({ materias: materias });  
    this.obterMaterias()    
    this.setState({ display: true, identificacao : id })
  }

  obterMaterias = () => {
    const { materias} = this.state;
    let content = [], teste    
    materias.forEach((item) => {      
      teste = item.artigos
      teste.forEach((item) =>
        content.push(item))     
      this.setState({ links: content });
    })  
  }

  render() {
    const { modulos, links, display, identificacao } = this.state;   

    let post =
      (<div className="artigos__secao">
        {links.map((item) => (
          <Artigo
            sobreLink={item.texto}
            tag={item.tag}
            link={item.link}
          />
        ))}
      </div>)

    return (
      <div className="modulos__secao" >
        <TituloSecao
          texto="Guia de Estudos" />
        <div className="modulos__secao--container">
          {modulos.map(({ id, numero, nome, materias }) => (
            <>
              <Modulo
                key={id}
                numero={numero}
                nomeModulo={nome}
                onClick={() => this.onClick(materias, id)} />
              {(display && identificacao === id) && post}
            </>
          ))}        
        </div>
      </div>
    )
  }
}


export default ModulosSecao