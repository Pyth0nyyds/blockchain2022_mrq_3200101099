import {Button, Image, List} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {useEffect, useState} from 'react';
import {StudentSocietyDAOContract, myERC20Contract, web3} from "../../utils/contracts";
import './index.css';
import React from 'react';

const GanacheTestChainId = '0x539' 
const GanacheTestChainName = 'Ganache Test Chain'
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545'

const StudentSocietyDAOPage = () => {

    const [account, setAccount] = useState('')
    const [accountBalance, setAccountBalance] = useState(0)
    const [name,setName] = useState<string>('')
    const [content,setContent] = useState<string>('')
    const [index,setIndex] = useState<string>('')
    const [agree,setAgree] = useState<number>(0)
    const [disagree,setDisagree] = useState<number>(0)
    const [ifpass,setIfpass] = useState<boolean>(false)

    useEffect(() => {
        const initCheckAccounts = async () => {
            // @ts-ignore
            const {ethereum} = window;
            if (Boolean(ethereum && ethereum.isMetaMask)) {
                const accounts = await web3.eth.getAccounts()
                if(accounts && accounts.length) {
                    setAccount(accounts[0])
                }
            }
        }

        initCheckAccounts()
    }, [])

    useEffect(() => {
        const getAccountInfo = async () => {
            if (myERC20Contract) {
                const ab = await myERC20Contract.methods.balanceOf(account).call()
                setAccountBalance(ab)
            } else {
                alert('Contract not exists.')
            }
        }

        if(account !== '') {
            getAccountInfo()
        }
    }, [account])

    const onClaimTokenAirdrop = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (myERC20Contract) {
            try {
                await myERC20Contract.methods.airdrop().send({
                    from: account,
                    gas:1919810
                })
                alert('You have claimed ZJU Token.')
            } catch (error: any) {
                alert(error.message)
            }

        } else {
            alert('Contract not exists.')
        }
    }

    const onClickConnectWallet = async () => {
        // @ts-ignore
        const {ethereum} = window;
        if (!Boolean(ethereum && ethereum.isMetaMask)) {
            alert('MetaMask is not installed!');
            return
        }

        try {
            if (ethereum.chainId !== GanacheTestChainId) {
                const chain = {
                    chainId: GanacheTestChainId, // Chain-ID
                    chainName: GanacheTestChainName, // Chain-Name
                    rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
                };

                try {
                    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: chain.chainId}]})
                } catch (switchError: any) {
                    if (switchError.code === 4902) {
                        await ethereum.request({ method: 'wallet_addEthereumChain', params: [chain]
                        });
                    }
                }
            }

            await ethereum.request({method: 'eth_requestAccounts'});
            const accounts = await ethereum.request({method: 'eth_accounts'});
            setAccount(accounts[0] || 'Not able to get accounts');
        } catch (error: any) {
            alert(error.message)
        }
    }

    const onClickPropose = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (StudentSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentSocietyDAOContract.options.address, 114514).send({
                    from: account,
                    gas:1919810
                })

                await StudentSocietyDAOContract.methods.propose(name).send({
                    from: account,
                    gas:1919810
                })
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onClickIndex = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (StudentSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentSocietyDAOContract.options.address, 114514).send({
                    from: account,
                    gas:1919810
                })

                setContent(StudentSocietyDAOContract.methods.getname(Number(index)).call())

            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onClickAgree = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (StudentSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentSocietyDAOContract.options.address, 114514).send({
                    from: account,
                    gas:1919810
                })

                setAgree(StudentSocietyDAOContract.methods.agree(Number(index)).call())
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onClickDisagree = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (StudentSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentSocietyDAOContract.options.address, 114514).send({
                    from: account,
                    gas:1919810
                })

                setDisagree(StudentSocietyDAOContract.methods.disagree(Number(index)).call())
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const onClickIfpass = async () => {
        if(account === '') {
            alert('You have not connected wallet yet.')
            return
        }

        if (StudentSocietyDAOContract && myERC20Contract) {
            try {
                await myERC20Contract.methods.approve(StudentSocietyDAOContract.options.address, 114514).send({
                    from: account,
                    gas:1919810
                })

                setIfpass(StudentSocietyDAOContract.methods.ifpass(Number(index)).call())
            } catch (error: any) {
                alert(error.message)
            }
        } else {
            alert('Contract not exists.')
        }
    }

    const handleName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setName(event.target.value)
    }

    const handleIndex = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setIndex(event.target.value)
    }

    return (
        <div className='container'>
            <div className='main'>
                <h1>学生提案系统</h1>
                <div className='account'>
                    {account === '' && <Button onClick={onClickConnectWallet}>连接钱包</Button>}
                    <div>当前用户：{account === '' ? '无用户连接' : account}</div>
                    <div>当前用户拥有积分数目：{account === '' ? 114514 : accountBalance}</div>
                </div>
                <Button onClick={onClaimTokenAirdrop}>领取提案积分</Button>
                <div className='operation'>
                    <div className='buttons'>
                    <input type="text" placeholder="请输入提案内容" value={name} onChange={handleName} />
                    <Button onClick={onClickPropose}>进行提案！</Button>
                    <input type="number" placeholder="请输入提案标号" value={index} onChange={handleIndex} />
                    <Button onClick={onClickIndex}>查看提案内容：{content}</Button>
                    <div>
                    <Button onClick={onClickAgree}>赞成，票数：{agree}</Button>
                    <Button onClick={onClickDisagree}>反对，票数：{disagree}</Button>
                    </div>
                    <Button onClick={onClickIfpass}>提案结算：{ifpass ? '提案通过！' : "提案未通过~"}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSocietyDAOPage