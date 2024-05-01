import { useState } from "react";
import FirstBrand from "../../components/UserPanel/BrandKit/FirstBrand";
import BrandGuidelines from "../../components/UserPanel/BrandKit/BrandGuidelines";
import Creating from "../../components/UserPanel/BrandKit/Creating";
import AllBrands from "../../components/UserPanel/BrandKit/AllBrands";
import { useMyBrandKitsQuery } from "../../features/brand-kit/brandKitApi";
import Loading from "../../Shared/Loading";

const BrandKit = () => {
  const { data, isLoading } = useMyBrandKitsQuery();
  const [step, setStep] = useState(0);
  console.log("brand kits: ", data);
  return (
    <div className="h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.data?.length > 0 && step === 0 && (
            <AllBrands setStep={setStep} data={data?.data} />
          )}
          {step === 1 && <FirstBrand setStep={setStep} />}
          {step === 2 && <BrandGuidelines setStep={setStep} />}
          {step === 3 && <Creating setStep={setStep} />}
        </>
      )}
    </div>
  );
};

export default BrandKit;
