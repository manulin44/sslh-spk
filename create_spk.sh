rm -Rf tmp
mkdir tmp
cd spk/target
tar -cvzf ../../tmp/package.tgz *
cd ..
cp -R scripts ../tmp/
cp INFO ../tmp
cd ../tmp
tar -cvf ../SSLH-SCP-Tinyproxy-1.0.0-1.spk *
