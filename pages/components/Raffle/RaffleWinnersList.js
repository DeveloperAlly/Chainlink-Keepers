import React from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import web3 from "../../api/web3";

const RaffleWinnersList = ({ winnersRegistry }) => {
  console.log("winners", winnersRegistry);
  const renderRows = (winner) => {
    console.log("render", winner[0]);
    return (
      <>
        <Table.Row>
          <Table.Cell>{winner[0]}</Table.Cell>
          <Table.Cell>{web3.utils.fromWei(winner[1], "ether")} ETH</Table.Cell>
          <Table.Cell>{winner[2]}</Table.Cell>
        </Table.Row>
      </>
    );
  };

  const renderPagination = () => {
    return (
      <>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Menu floated="right" pagination>
              <Menu.Item as="a" icon>
                <Icon name="chevron left" />
              </Menu.Item>
              <Menu.Item as="a">1</Menu.Item>
              <Menu.Item as="a">2</Menu.Item>
              <Menu.Item as="a">3</Menu.Item>
              <Menu.Item as="a">4</Menu.Item>
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
      <Table.Body>
        {winnersRegistry.map((winner) => {
          console.log("one winn", winner);
          return renderRows(winner);
        })}
      </Table.Body>
      {/* <Table.Footer>{renderPagination()}</Table.Footer> */}
    </Table>
  );
};

export default RaffleWinnersList;
