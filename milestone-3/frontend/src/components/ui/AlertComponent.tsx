import { Alert, CloseButton } from "@chakra-ui/react";

type Props = {
  message: string;
  status: "info" | "warning" | "success" | "error";
};
const AlertComponent = ({ message, status }: Props) => {
  return (
    <Alert.Root status={status}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>
          {status === "success" ? "Success!" : "Error!"}
        </Alert.Title>
        <Alert.Description>{message}</Alert.Description>
      </Alert.Content>
      <CloseButton pos="relative" top="-2" insetEnd="-2" />
    </Alert.Root>
  );
};

export default AlertComponent;
