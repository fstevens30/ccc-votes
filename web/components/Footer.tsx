export default function Footer () {
  return (
    <footer className='p-4 border-t border-gray-200 mt-8 w-full fixed bottom-0 left-0 bg-white'>
      <div className='flex flex-col items-center'>
        <p className='text-sm text-gray-600'>
          Disclaimer: This website is not affiliated with or endorsed by the
          Christchurch City Council. Learn more{' '}
          <a href='/about' className='underline'>
            here
          </a>
        </p>
      </div>
    </footer>
  )
}
