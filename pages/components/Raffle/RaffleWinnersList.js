import React from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import web3 from "../../api/web3";

const RaffleWinnersList = ({ winnersRegistry }) => {
  const renderRows = (winner, idx) => {
    return (
      <>
        <Table.Row key={idx}>
          <Table.Cell>{winner[0]}</Table.Cell>
          <Table.Cell>{web3.utils.fromWei(winner[1], "ether")} ETH</Table.Cell>
          <Table.Cell>{winner[2]}</Table.Cell>
        </Table.Row>
      </>
    );
  };

  //TODO: working pagination
  const renderPagination = () => {
    const length = winnersRegistry.length / 10 + 1;
    var nums = [];
    for (let i = 1; i < length; i++) {
      nums.push(i);
    }
    return (
      <>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Menu floated="right" pagination>
              <Menu.Item as="a" icon>
                <Icon name="chevron left" />
              </Menu.Item>
              {nums.map((n) => {
                return (
                  <Menu.Item as="a" key={n}>
                    {n}
                  </Menu.Item>
                );
              })}
              <Menu.Item as="a" icon>
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </>
    );
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Winner Address</Table.HeaderCell>
          <Table.HeaderCell>Prize Pool</Table.HeaderCell>
          <Table.HeaderCell>RoundID</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {winnersRegistry && (
        <>
          <Table.Body>
            {winnersRegistry.map((winner, idx) => {
              return renderRows(winner, idx);
            })}
          </Table.Body>
          <Table.Footer>{renderPagination()}</Table.Footer>{" "}
        </>
      )}
    </Table>
  );
};

export default RaffleWinnersList;
