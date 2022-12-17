import { FormEvent, useRef } from "react";
import classes from "./decryptor.module.css";

const Decrypt = (
  stre: string,
  prikey: string,
  enc: string,
  decr: string
): string => {
  let strd = "";
  let dkey: string[] = [];
  let ekey: string[] = [];
  let d11: string[] = [];
  let e11: string[] = [];
  for (let i = 0; i < prikey.length; i++) {
    dkey.push(i.toString());
    ekey.push(prikey[i]);
  }
  for (let i = 0; i < decr.length; i++) {
    d11.push(decr[i]);
  }
  let denc: string = "";
  for (let i = 0; i < enc.length; i++) {
    denc += dkey[ekey.indexOf(enc[i])];
  }
  for (let i = 0; i < denc.length; i += 3) {
    let ei = denc[i] + denc[i + 1] + denc[i + 2];
    e11.push(ei);
  }
  for (let i = 0; i < stre.length; i += 3) {
    let sei = stre[i] + stre[i + 1] + stre[i + 2];
    strd += d11[e11.indexOf(sei)];
  }
  return strd;
};

const Decryptor: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dRef = useRef<HTMLInputElement>(null);
  const eRef = useRef<HTMLInputElement>(null);
  const prikeyRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);
  const decryptHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredText = inputRef.current!.value;
    const enteredEnc = eRef.current!.value;
    const enteredDec = dRef.current!.value;
    const prikey = prikeyRef.current!.value;
    const outputText = Decrypt(enteredText, prikey, enteredEnc, enteredDec);
    outputRef.current!.value = outputText;
  };
  return (
    <form className={classes.form} onSubmit={decryptHandler}>
      <label htmlFor="input">Input</label>
      <input type="text" id="input" ref={inputRef} />
      <label htmlFor="D">Public Key 1</label>
      <input type="text" id="D" ref={dRef} />
      <label htmlFor="E">Public Key 2</label>
      <input type="text" id="E" ref={eRef} />
      <label htmlFor="prikey">Private Key</label>
      <input type="text" id="prikey" ref={prikeyRef} />
      <label htmlFor="prikey">Output</label>
      <input type="text" id="output" ref={outputRef} disabled />
      <button type="submit">Decrypt</button>
    </form>
  );
};

export default Decryptor;
