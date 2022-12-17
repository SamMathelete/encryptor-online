import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const router = useRouter();
  const encryptButtonClickHandler = () => {
    router.push(`/encryptor/`);
  };
  const decryptButtonClickHandler = () => {
    router.push(`/decryptor/`);
  };
  return (
    <div>
      <button onClick={encryptButtonClickHandler}>Encryptor</button>
      <button onClick={decryptButtonClickHandler}>Decryptor</button>
    </div>
  );
};
export default HomePage;
