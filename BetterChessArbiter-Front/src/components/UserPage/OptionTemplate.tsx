import Icon from "../Icon";

type OptionTemplateProps = {
  topText: string;
  description: string;
  iconName: string;
};
function OptionTemplate({
  topText,
  description,
  iconName,
}: OptionTemplateProps) {
  return (
    <div className="bg-[#EFEFEF] rounded-lg p-4 shadow-md w-1/2 m-2">
      <div className="justify-between flex flex-row">
        <p className="font-semibold text-lg">{topText}</p>
        <Icon Icon={iconName} />
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}

export default OptionTemplate;
