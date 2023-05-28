import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import requester from "../../../api/requester";
import {
  Avatar,
  Button,
  Divider,
  Form,
  List,
  Mentions,
  Skeleton,
  notification,
} from "antd";
import { IMAGE_CDN_URL } from "../../../constant";
import { Link } from "react-router-dom";

export default function MemberList({ members }) {
  if (!members?.length) {
    return <></>;
  }
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={members.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          header={"Members"}
          dataSource={members}
          renderItem={(user) => (
            <List.Item key={user.email}>
              {console.log(IMAGE_CDN_URL + user.avatar)}
              <List.Item.Meta
                avatar={<Avatar src={IMAGE_CDN_URL + user.avatar} />}
                title={<Link to={`/user/${user.id}`}>{user.username}</Link>}
                description={user.email}
              />
              <Button onClick={() => {}}>Delete</Button>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}
