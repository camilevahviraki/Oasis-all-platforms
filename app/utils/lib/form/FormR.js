import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
// import Countries from '../../components/countries/countries'; // Adjust this import according to your component setup

const FormR = (props) => {
  const {
    classForm,
    inputsArray,
    submitFunction,
    submitButton,
    submitClass,
    errorMessage,
    inputErrorArr,
    inputWrapperClassName,
    getSelectedCountry,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles[classForm]}>

        {inputsArray.map((inputObj, key) => {
          const {
            classInput,
            label,
            name,
            onChangeFunc,
            placeholder,
            value,
            type,
            step,
          } = inputObj;

          return (
            <View key={key} style={styles[inputWrapperClassName] || styles.inputWrapper}>
              {label ? <Text style={styles.label}>{label}</Text> : null}

              {type === 'select-country' ? (
                <>
                  {/* <Countries
                  data={inputObj.data}
                  inputClass={styles[classInput]}
                  inputLabel={label || null}
                  getSelectedCountry={getSelectedCountry}
                  placeholder={placeholder || null}
                /> */}
                  {inputErrorArr && inputErrorArr[key] === 1 ? (
                    <Text style={styles.errorText}>Error: Invalid input</Text>
                  ) : null}
                </>
              ) : type === 'textarea' ? (
                <TextInput
                  style={styles[classInput] || styles.textarea}
                  placeholder={placeholder}
                  onChangeText={onChangeFunc || null}
                  value={value}
                  multiline={true}
                />
              ) : (
                <TextInput
                  style={styles[classInput] || styles.input}
                  placeholder={placeholder}
                  onChangeText={onChangeFunc || null}
                  value={value}
                  keyboardType={type === 'number' ? 'numeric' : 'default'}
                  step={step || null}
                />
              )}

              {inputErrorArr && inputErrorArr[key] === 1 ? (
                <Text style={styles.errorText}>Error: Invalid input</Text>
              ) : null}
            </View>
          );
        })}

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <Button
          onPress={submitFunction}
          title={submitButton}
          color={styles[submitClass] || 'blue'}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FormR;
