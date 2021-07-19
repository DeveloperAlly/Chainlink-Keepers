import React, { useEffect } from "react";
import { Message, Icon } from "semantic-ui-react";

const StatusMessage = ({
  status: { error = "", loading = "", warning = "", success = "" },
  ...props
}) => {
  return (
    <div>
      <Message
        compact
        icon
        negative={Boolean(error)}
        success={Boolean(success) && !Boolean(loading)}
        info={Boolean(loading)}
        warning={Boolean(warning)}
      >
        <Icon
          name={
            loading
              ? "circle notched"
              : error
              ? "times circle"
              : success
              ? "check circle"
              : "exclamation circle"
          }
          loading={Boolean(loading)}
        />
        <Message.Content>
          {Boolean(success) && !Boolean(loading) && (
            <Message.Header>Transaction Success!</Message.Header>
          )}
          {loading ? loading : error ? error : success ? success : warning}
        </Message.Content>
      </Message>
    </div>
  );
};

export default StatusMessage;
