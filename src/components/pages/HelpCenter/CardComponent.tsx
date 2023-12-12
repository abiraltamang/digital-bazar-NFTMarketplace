import React from "react";

interface CardProps {
  imageSrc: string;
  altText: string;
  title: string;
  content: string;
}

const CardComponent: React.FC<CardProps> = ({
  imageSrc,
  altText,
  title,
  content,
}) => {
  return (
    <div className="flex flex-col justify-center items-center border border-gray-400 rounded-md w-[307px] h-[239px] hover:shadow-lg hover:shadow-slate-300 transition-all ease-in-out delay-300">
      <img src={imageSrc} alt={altText} className="w-[60px]" />
      <h1 className="font-medium mt-3 mb-3">{title}</h1>
      <p className="font-normal text-center">
        {content.split("<br />").map((text, index) => (
          <React.Fragment key={index}>
            {text}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default CardComponent;
