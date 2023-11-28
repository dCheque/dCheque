import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import {
  Children,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { MotionBox } from "../MotionBox";
import StepperContext, { StepperReducerInterface } from "./StepperContext";
import StepperHeader from "./StepperHeader";

interface StepperProps {
  children: ReactNode;
  onClose?: () => void;
  hideHeader?: boolean;
}

enum StepperActionKind {
  SET_SCREEN = "SET_SCREEN",
  NEXT = "NEXT",
  BACK = "BACK",
}

interface StepperAction {
  type: StepperActionKind;
  screenKey?: string;
}

export interface ScreenProps {
  screenKey: string;
  screenTitle: string;
}

function reducer(state: StepperReducerInterface, action: StepperAction) {
  const { type, screenKey } = action;
  switch (type) {
    case StepperActionKind.NEXT: {
      const length = state.allScreens?.length ?? 0;
      const currentIndex =
        state.currentIndex < length - 1
          ? state.currentIndex + 1
          : state.currentIndex;
      const currentScreen = state.allScreens?.[currentIndex];
      return { ...state, currentIndex, currentScreen };
    }
    case StepperActionKind.BACK: {
      const currentIndex =
        state.currentIndex > 0 ? state.currentIndex - 1 : state.currentIndex;
      const currentScreen = state.allScreens?.[currentIndex];
      return { ...state, currentIndex, currentScreen };
    }
    case StepperActionKind.SET_SCREEN: {
      const currentScreen = state.allScreens?.filter(
        (child) => (child as ReactElement).props.screenKey == screenKey
      )[0];
      const currentIndex = state.allScreens?.indexOf(currentScreen) ?? 0;
      return { ...state, currentIndex, currentScreen };
    }
    default:
      return { ...state };
  }
}

function Stepper({ children, onClose, hideHeader = false }: StepperProps) {
  const allScreens: ReactNode[] = Children.toArray(children);
  const currentScreen: ReactNode =
    allScreens.length > 0 ? allScreens[0] : undefined;
  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    currentScreen,
    allScreens,
  });

  const next = () => {
    dispatch({ type: StepperActionKind.NEXT });
  };
  const back = () => {
    dispatch({ type: StepperActionKind.BACK });
  };
  const goToStep = (screenKey: string) => {
    dispatch({ type: StepperActionKind.SET_SCREEN, screenKey });
  };

  const screenTitle = useMemo(() => {
    return (state.currentScreen as ReactElement).props.screenTitle;
  }, [state.currentScreen]);
  return (
    <StepperContext.Provider
      value={{
        ...state,
        next,
        back,
        goToStep,
        onClose,
      }}
    >
      {!hideHeader && (
        <StepperHeader
          back={back}
          onClose={onClose}
          currentIndex={state.currentIndex}
          title={screenTitle}
        />
      )}
      <AnimatePresence mode="wait">
        <Box
          key={(state.currentScreen as ReactElement).props.screenKey}
          w="100%"
        >
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            w="100%"
          >
            {state.currentScreen}
          </MotionBox>
        </Box>
      </AnimatePresence>
    </StepperContext.Provider>
  );
}

export function useStep() {
  return useContext(StepperContext);
}

export default Stepper;
