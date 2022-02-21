import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import * as ecc from "tiny-secp256k1";
const ECPair = ECPairFactory(ecc);

interface IWallet {
	privateKey: string;
	publicKey: string;
	address: string;
}

export function GenerateWallet() {
	let keyPair = ECPair.makeRandom();
	const { address } = bitcoin.payments.p2sh({
		redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }),
	});

	let WIF = keyPair.toWIF();

	return {
		publicKey: keyPair.publicKey.toString("hex"),
		address,
		WIF,
	};
}
