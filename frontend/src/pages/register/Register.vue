<script setup lang="ts">
import { isEmail } from 'class-validator'
import useLogin from './useRegister'

const emailInputRef = ref()

const {
  leftSeconds,
  sendEmailCodeHandler,
  isSendEmailCodeLoading,
  //
  registerForm,
  isRegisterLoading,
  registerHandler
} = useLogin({ emailInputRef })
</script>

<template>
  <div _flex="~">
    <q-form _m="auto" _w="80vw max-350px" _space="y-10px" @submit="registerHandler">
      <template v-if="true">
        <q-input
          ref="emailInputRef"
          v-model="registerForm.email"
          :label="$t('email')"
          maxlength="255"
          outlined
          lazy-rules
          :rules="[v => isEmail(v) || $t('Please enter your email')]"
        />
        <div _flex="~">
          <div _flex="1">
            <q-input
              v-model="registerForm.emailCode"
              :label="$t('SMS code')"
              outlined
              maxlength="6"
              lazy-rules
              :rules="[
                v => /\d{6}/.test(v) || $t('Please enter a 6-digit verification code')
              ]"
            />
          </div>

          <q-btn
            _w="170px"
            _m="l-20px"
            _h="56px"
            color="primary"
            icon="email"
            :loading="leftSeconds > 0 || isSendEmailCodeLoading"
            @click="sendEmailCodeHandler"
          >
            <div _m="l-10px">{{ $t('Send Email Code') }}</div>
            <template v-if="leftSeconds > 0" v-slot:loading>
              <q-spinner-hourglass />
              <div _m="l-10px">{{ leftSeconds }}</div>
            </template>
          </q-btn>
        </div>

        <q-input
          v-model="registerForm.psd"
          :label="$t('psd')"
          maxlength="20"
          outlined
          lazy-rules
          type="password"
          :rules="[
            v => v.length >= 6 || $t('Please enter a password of at least 6 characters')
          ]"
        />
      </template>

      <q-btn
        :loading="isRegisterLoading"
        :label="$t('register')"
        icon="person"
        color="primary"
        _m="!t-20px"
        _w="full"
        _h="54px"
        type="submit"
      />
    </q-form>
  </div>
</template>

