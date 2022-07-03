/*
 * @author: tisfeng
 * @createTime: 2022-07-01 21:54
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-07-03 17:34
 * @fileName: releaseDetail.tsx
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { Action, ActionPanel, Detail, Icon } from "@raycast/api";
import { useState } from "react";
import { Easydict } from "./version";

/**
 * Return a release Detail page with the markdown content.
 *
 * @fallbackMarkdown The placeholder markdown content before fetching from GitHub.
 */
export function ReleaseDetail(props: { fallbackMarkdown?: string }) {
  const [releaseMarkdown, setReleaseMarkdown] = useState<string>();

  console.log(`call ReleaseDetail function`);
  const easydict = new Easydict();
  easydict.fetchReleaseMarkdown().then((markdown) => {
    if (markdown && markdown.length > 0) {
      console.log(`fetched release markdown, url: ${easydict.getReleaseApiUrl()}`);
      setReleaseMarkdown(markdown);
    } else {
      console.error("Failed to fetch GitHub release markdown, use local stored instead.");
      setReleaseMarkdown(easydict.releaseMarkdown);
    }
  });

  // Todo: need to set hasPrompted to true when user click the button, and store the value to local storage.
  easydict.hasPrompted = false;

  return (
    <Detail
      markdown={releaseMarkdown || props.fallbackMarkdown}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            icon={Icon.Globe}
            title="View Details on GitHub"
            url="https://github.com/tisfeng/Raycast-Easydict#readme"
          />
        </ActionPanel>
      }
    />
  );
}

/**
 * Return a markdown page with the markdown content.
 */
export function MarkdownPage(props: { markdown: string }) {
  return (
    <Detail
      markdown={props.markdown}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            icon={Icon.Globe}
            title="View Details on GitHub"
            url="https://github.com/tisfeng/Raycast-Easydict#readme"
          />
        </ActionPanel>
      }
    />
  );
}