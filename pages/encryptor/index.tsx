import { FormEvent, useRef } from "react";
import classes from "./encryptor.module.css";

interface encrypted {
  stre: string;
  encr: string;
  decr: string;
}

const StartSession = (): string => {
  let d: string[] = [];
  let e: string[] = [];
  for (let i: number = 0; i < 10; i++) {
    d.push(i.toString());
    let ein = Math.floor(Math.random() * 2);
    let ei = Math.floor(Math.random() * 26) + 65 + 32 * ein;
    let eis = String.fromCharCode(ei);
    while (e.includes(eis) || eis === d[i]) {
      ei = Math.floor(Math.random() * 26) + 65 + 32 * ein;
      eis = String.fromCharCode(ei);
    }
    e.push(eis);
  }
  let prikey: string = "";
  for (let x: number = 0; x < e.length; x++) {
    prikey += e[x];
  }
  return prikey;
};

const Encrypt = (s: string, prikey: string): encrypted => {
  let d: string[] = [];
  let e: string[] = [];
  for (let i: number = 0; i < prikey.length; i++) {
    e.push(prikey[i]);
    d.push(i.toString());
  }
  let d1: string[] = [];
  let e1: string[] = [];
  let stre: string[] = [];
  let n: number = s.length;
  for (let i: number = 0; i < n; i++) {
    if (d1.includes(s[i])) {
      stre.push(e1[d1.indexOf(s[i])]);
    } else if (s[i] === "\n") {
      stre.push("\n");
    } else {
      d1.push(s[i]);
      let ei = Math.floor(Math.random() * 900) + 100;
      while (e1.includes(ei.toString()) || ei === s[i].charCodeAt(0)) {
        ei = Math.floor(Math.random() * 900) + 100;
      }
      e1.push(ei.toString());
      stre.push(ei.toString());
    }
  }
  let stree = "";
  for (let x: number = 0; x < stre.length; x++) {
    stree += stre[x];
  }
  let encr = "";
  for (let x: number = 0; x < e1.length; x++) {
    encr += e1[x];
  }
  let encrr: string[] = [];
  for (let i = 0; i < encr.length; i++) {
    encrr.push(encr[i]);
  }
  let enc: string = "";
  for (let x: number = 0; x < encrr.length; x++) {
    enc += e[d.indexOf(encrr[x])];
  }
  let decr = "";
  for (let x: number = 0; x < d1.length; x++) {
    decr += d1[x];
  }
  return {
    stre: stree,
    encr: enc,
    decr,
  };
};

const Encryptor: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);
  const dRef = useRef<HTMLInputElement>(null);
  const eRef = useRef<HTMLInputElement>(null);
  const prikeyRef = useRef<HTMLInputElement>(null);
  const encryptHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredText = inputRef.current!.value;
    const prikey = StartSession();
    const outputText = Encrypt(enteredText, prikey);
    prikeyRef.current!.value = prikey;
    outputRef.current!.value = outputText.stre;
    dRef.current!.value = outputText.decr;
    eRef.current!.value = outputText.encr;
  };
  return (
    <form className={classes.form} onSubmit={encryptHandler}>
      <label htmlFor="input">Input</label>
      <input type="text" id="input" ref={inputRef} />
      <label htmlFor="prikey">Private Key</label>
      <input type="text" disabled id="prikey" ref={prikeyRef} />
      <label htmlFor="output">Output</label>
      <input type="text" id="output" disabled ref={outputRef} />
      <label htmlFor="D">Public Key 1</label>
      <input type="text" id="D" disabled ref={dRef} />
      <label htmlFor="E">Public Key 2</label>
      <input type="text" id="E" disabled ref={eRef} />
      <button type="submit">Encrypt</button>
    </form>
  );
};

export default Encryptor;
