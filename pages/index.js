import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import ERC20TokenInstance from '../ethereum/ERC20TokenInstance';

class ERC20Index extends React.Component {

    render() {
        return (
            <Layout>
                <div id="home-wrapper">
                    <h1>ERC20 Token ( Cryptocurrency ) </h1>
                    <h2>By Wahsidin Tjandra</h2>
                    <p>
                        <a target="_blank"href="https://www.udemy.com/course/ethereum-and-solidity-the-complete-guide-for-developer/">
                            Learn Ethereum, Solidity, Food Supply Chain & Cryptocurrency, The Complete Guide for Developer Course
                        </a>
                    </p>
                </div>
            </Layout>
        );
    }

}
export default ERC20Index;