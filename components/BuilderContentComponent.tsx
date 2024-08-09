import {
  Content,
  fetchOneEntry,
  isPreviewing,
  subscribeToEditor,
  type BuilderContent,
} from "@builder.io/sdk-react-native";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

// const BUILDER_API_KEY = '386ea53f10e94443946f4d024a731d71';
const BUILDER_API_KEY = "c516a1f505a8445f93450becacc21f42";
const MODEL_NAME = "page";

export const BuilderContentComponent = () => {
  const path = usePathname();
  const [content, setContent] = useState<BuilderContent | null>(null);

  console.log(path);

  useEffect(() => {
    fetchOneEntry({
      model: MODEL_NAME,
      apiKey: BUILDER_API_KEY,
      userAttributes: {
        urlPath: path || "/",
      },
    })
      .then((data) => {
        setContent(data);
      })
      .catch((err) => console.error("Error fetching Builder Content: ", err));
    if (isPreviewing())
      return subscribeToEditor(MODEL_NAME, (data) => setContent(data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>
        Hello from your React Native codebase. Below is your Builder content:
      </Text>
      {content ? (
        <Content
          apiKey={BUILDER_API_KEY}
          model={MODEL_NAME}
          content={content}
        />
      ) : (
        <Text>Not Found.</Text>
      )}
    </View>
  );
};
