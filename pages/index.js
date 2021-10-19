import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import ERC20TokenInstance from '../ethereum/ERC20TokenInstance';

class ERC20Index extends React.Component {

    /*
    static async getInitialProps(props){
        const supplyChainFactory  = await supplyChainFactoryInstance.methods.getDeployedSupplyChain().call();
        var supplyChainsArray = [];
     
        if( supplyChainFactory.length > 0 ){
            for( var x=0; x < supplyChainFactory.length ; x++ ){
                var supplyChainObject = {};
                var address = supplyChainFactory[x];
                var supplyChain = supplyChainInstance(address);  

                supplyChainObject['title'] =  await supplyChain.methods.supplyChainTitle().call();
                supplyChainObject['address'] = address;
                supplyChainsArray[x] = supplyChainObject;
            }   
        }

        return{
            supplyChainsArray: supplyChainsArray
        };
    }
    */
    renderSupplyChains(){
        
    
        /*
            USING SEMANTIC REACT UI CARD 
        */
        const items = this.props.supplyChainsArray.map( info => {

            var infoString = info['title'] + ' ( ' + info['address'] + ' ) ';

            return {
                header : (
                    <div className="header" style={{textTransform:"capitalize"}}>{infoString}</div>
                ),
                description : (
                    <Link route={`/supply-chain/${info['address']}`}>
                        <a>
                            View Supply Chain
                        </a>
                    </Link>
                ),
                fluid : true
            }
        });
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
            <div>
                
            </div>
            </Layout>
        );
    }

}
export default ERC20Index;